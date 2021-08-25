import express from 'express';
import { Op } from 'sequelize';
import { badRequest } from '../helper/customError';
import { createGuid, deleteFile } from '../helper/fileHelper';
import { s3 } from '../helper/aws';

const { files, file_temp } = require('../models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: file
 *   description: 파일
 */

/**
 * @swagger
 * /api/file/:
 *   get:
 *     security:
 *       - Access_Token: []
 *     summary: 쿼리스트링으로 필터링하여 파일을 조회합니다.
 *     tags: [file]
 *     parameters:
 *      - name: srlList
 *        in: query
 *        description: 파일 srl //스웨거에선 오류
 *        required: true
 *        type: array
 *        items:
 *          type: string
 *     responses:
 *       allOf:
 *       - $ref: '#/components/responses/All'
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               message: "모듈 조회 성공"
 *               data: [{
 *                 "srl": 6887,
 *                 "file_group_srl": null,
 *                 "guid": "8865d9ce-2b6b-43cc-863d-df40260552be",
 *                 "name": "fastlawer.png",
 *                 "path": "000/000/006/000000006887_8865d9ce-2b6b-43cc-863d-df40260552be.png",
 *                 "extension": ".png",
 *                 "size": 3815,
 *                 "mime_type": "image/png",
 *                 "reg_date": "2020-04-16T15:58:57",
 *                 "create_srl": 6052,
 *                 "use_status": "Y"
 *               }]
 */

router.get('/', async (req, res) => {
  try {
    const srlList = req.query.srlList;

    if (!srlList.length) return badRequest(res, 'srlList를 입력해주세요.');

    const result = await files.findAll({
      where: {
        file_srl: {
          [Op.in]: srlList,
        },
      },
    });

    res.send({
      success: true,
      message: 'success',
      data: result,
    });
  } catch (e) {
    return badRequest(res, '파일조회 실패', e);
  }
});


/**
 * @swagger
 * /api/file/{srl}:
 *   delete:
 *     security:
 *       - Access_Token: []
 *     summary: 파일 삭제
 *     tags: [file]
 *     parameters:
 *      - name: "srl"
 *        in: "path"
 *        description: "파일 srl"
 *        required: true
 *        type: integer
 *     responses:
 *       allOf:
 *       - $ref: '#/components/responses/All'
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               message: "파일 삭제 성공했습니다"
 *               data: "파일 삭제 성공했습니다"
 */


router.delete('/:srl', async (req, res) => {
  try {
    const { srl: file_srl } = req.params;

    if (!file_srl) return badRequest(res, '파일 srl 누락');

    const result = await files.findOne({
      attributes: ['cid', 'bigo', 'cast_member_cid', 'reg_date'],
      where: { file_srl },
    });

    const data = await deleteFile(result);

    res.send({
      success: true,
      message: '파일 삭제 성공했습니다',
      data
    });
  } catch (e) {
    return badRequest(res, '파일삭제 실패 했습니다.', e);
  }
});

/**
 * @swagger
 * /api/file/uploadUrl:
 *   post:
 *     summary: upload가능한 서명된 s3 url 을 요청합니다
 *     tags: [file]
 *     security:
 *       - Access_Token: []
 *     requestBody:
 *       description: 업로드 파일명
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/FileName"
 *     responses:
 *       200:
 *         description: "successful operation"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: "string"
 *               example: "true"
 *             message:
 *               type: "string"
 *               example: "success"
 *             data:
 *               type: "array"
 *               example: [
 *                  { "url": "abdcdcdcd.com", "fileName": "c1c6bfcf-3a2a-4867-a8a4-08bae8c76564.jpg", "orgin_fileName": "ss.jpg" },
 *                  { "url": "abdcdcdcd.com", "fileName": "c1c6bfcf-3a2a-4867-a8a4-08bae8c76564.jpg", "orgin_fileName": "ss.jpg" }
 *               ]
 */

router.post('/uploadUrl', async (req, res) => {
  try {
    const { fileNames } = req.body;

    if (!fileNames.length) return badRequest(res, '비어있습니다');

    const makeUrls = fileNames.map((originFileName) => {
      return new Promise((resolve, reject) => {
        const fileName = createGuid() + '.' + originFileName.split('.')[1];
        const params = {
          Bucket: process.env.S3_BUCKET,
          Key: `temporary/${fileName}`,
          Expires: 300,
        };

        s3.getSignedUrl('putObject', params, (err, url) => {
          if (err) reject(err);

          file_temp
            .create({
              temp_file_name: fileName,
              orgin_file_name: originFileName,
            })
            .then(() => {
              resolve({ url, fileName, orgin_fileName: originFileName });
            });
        });
      });
    });

    const result = await Promise.all(makeUrls);

    res.send({
      success: true,
      message: 'success',
      data: result,
    });
  } catch (e) {
    return badRequest(res, 'uploadUrl 요청 실패 했습니다');
  }
});

/**
 * @swagger
 * /api/file/downloadUrl/{srl}:
 *   post:
 *     summary: 서명된 s3의 Download url을 제공합니다.
 *     tags: [file]
 *     security:
 *       - Access_Token: []
 *     parameters:
 *      - name: "srl"
 *        in: "path"
 *        description: "파일 srl"
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: "successful operation"
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: "string"
 *               example: "true"
 *             message:
 *               type: "string"
 *               example: "success"
 *             data:
 *               type: "array"
 *               example:
 *                  { "url": "abdcdcdcd.com", "fileName": "c1c6bfcf-3a2a-4867-a8a4-08bae8c76564.jpg", "orgin_fileName": "ss.jpg" }
 */

router.post('/downloadUrl/:srl', async (req, res) => {
  try {
    const { srl: file_srl } = req.params;

    if (!file_srl) return badRequest(res, 'srl를 확인해주세요');

    const result = await files.findAll({ where: { file_srl } });

    const url = await new Promise((resolve, reject) => {
      const params = {
        Bucket: result.s3_bucket,
        Key: result.path,
        Expires: 100,
        ResponseContentType: 'application/octet-stream',
        ResponseContentDisposition: `attachment; filename*=utf-8''${encodeURI(
          result.name
        )}`,
      };

      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });

    const data = {
      url,
      fileName: result.path,
      orgin_fileName: result.name,
    };

    res.send({
      success: true,
      message: 'success',
      data,
    });
  } catch (err) {
    return badRequest(res, 'downloadUrl 요청 실패 했습니다');
  }
});

module.exports = router;
