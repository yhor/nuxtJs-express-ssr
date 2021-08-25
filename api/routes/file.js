import express from 'express'
import { Op } from 'sequelize'
import { badRequest } from '../helper/customError'
// import { createGuid, deleteFile } from '../../helper/fileHelper';
// import { s3 } from '../../helper/aws';

const { files } = require('../models')
// const { files, file_temp } = require('../../models');
const router = express.Router()

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
 *                 "cid": 6887,
 *                 "file_group_cid": null,
 *                 "guid": "8865d9ce-2b6b-43cc-863d-df40260552be",
 *                 "name": "fastlawer.png",
 *                 "path": "000/000/006/000000006887_8865d9ce-2b6b-43cc-863d-df40260552be.png",
 *                 "extension": ".png",
 *                 "size": 3815,
 *                 "mime_type": "image/png",
 *                 "reg_date": "2020-04-16T15:58:57",
 *                 "create_cid": 6052,
 *                 "use_status": "Y"
 *               }]
 */

router.get('/', async (req, res) => {
  try {
    const srlList = req.query.srlList

    if (!srlList.length) return badRequest(res, 'srlList를 입력해주세요.')

    const result = await files.findAll({
      where: {
        file_srl: {
          [Op.in]: srlList,
        },
      },
    })

    res.send({
      success: true,
      message: 'success',
      data: result,
    })
  } catch (e) {
    return badRequest(res, '파일조회 실패', e)
  }
})

// router.delete('/:cid', isLoggedIn, async(req, res) => {
//     try {
//         let cid = req.params.cid;

//         let date  = await knex('fileinfo').where({cid}).select("cid", "path", "file_group_cid");

//         await deleteFile(date);

//         res.send({
//             success : true,
//             message : '파일 삭제 성공했습니다',
//         });

//     } catch (e) {
//         return badRequest(res, '파일삭제 실패 했습니다.' , e);
//     }
// });

/**
 * @swagger
 * /api/file/uploadUrl:
 *   post:
 *     summary: upload가능한 서명된 s3 url 을 요청합니다
 *     tags: [file]
 *     security:
 *       - Access_Token: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: 어레이로 전송
 *         required: true
 *         schema:
 *           $ref: "#/definitions/FileName"
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
    const { filaNames } = req.body;

    if (!filaNames.length) return badRequest(res, '비어있습니다');

    // const result = await Promise.all(
    //   filaNames.map((x) => {
    //     return new Promise((resolve, reject) => {
    //       const fileName = createGuid() + '.' + x.split('.')[1]
    //       const params = {
    //         Bucket: process.env.S3_NAME,
    //         Key: `temporary/${fileName}`,
    //         Expires: 300,
    //       }

    //       s3.getSignedUrl('putObject', params, (err, url) => {
    //         if (err) reject(err)
    //         knex('fileinfo_temp')
    //           .insert({ temp_file_name: fileName, orgin_file_name: x })
    //           .then(() => {
    //             resolve({ url, fileName, orgin_fileName: x })
    //           })
    //       })
    //     })
    //   })
    // )

    res.send({
      success: true,
      message: 'success',
      // data: result,
    })
  } catch (e) {
    return badRequest(res, 'uploadUrl 요청 실패 했습니다', e)
  }
})

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
    const { srl } = req.params

    if (!srl) return badRequest(res, 'srl를 확인해주세요')

    const result = await files.findAll({ where: { srl } })

    const url = await new Promise((resolve, reject) => {
      const params = {
        Bucket: result.s3_bucket,
        Key: result.path,
        Expires: 100,
        ResponseContentType: 'application/octet-stream',
        ResponseContentDisposition: `attachment; filename*=utf-8''${encodeURI(
          result.name
        )}`,
      }

      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err)
        resolve(url)
      })
    })

    const data = {
      url,
      fileName: result.path,
      orgin_fileName: result.name,
    }

    res.send({
      success: true,
      message: 'success',
      data,
    })
  } catch (e) {
    console.log('e', e)
    return badRequest(res, 'downloadUrl 요청 실패 했습니다')
  }
})

module.exports = router
