import express from 'express';
import { Op } from 'sequelize';
import { badRequest } from '../../helper/customError';
import { now } from '../../helper/timeHelper';
import { s3FileCopy, s3FileDelete } from '../../helper/fileHelper';

const {
  comments,
  modules,
  sequence,
  sequelize,
  files,
  file_temp,
} = require('../../models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: admin/comments
 *   description: 댓글
 */

/**
 * @swagger
 * /api/admin/comments:
 *   get:
 *     summary: 댓글 리스트
 *     tags: [admin/comments]
 *     parameters:
 *       - in: query
 *         name: module
 *         required: false
 *         schema:
 *           type: "string"
 *     responses:
 *       allOf:
 *       - $ref: '#/components/responses/All'
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               message: "댓글 조회 성공"
 *               data: [{
 *                 "module_srl": 1,
 *                 "module": "board",
 *                 "mid": "notice",
 *                 "browser_title": "브라우저 제목",
 *                 "layout": "PC 레이아웃",
 *                 "mlayout": "모바일 레이아웃",
 *                 "skin": "PC 스킨",
 *                 "mskin": "모바일 스킨",
 *                 "content": "PC 내용",
 *                 "mcontent": "모바일 내용",
 *                 "created_at": "2021-08-24T11:42:58.000Z"
 *               }]
 */

router.get('/', async (req, res) => {
  try {
    console.log('req', req.headers['user-agent']);
    // const queryCondition = req.query;

    // const result = await comments.findAll({ where: queryCondition });

    return res.json({
      success: true,
      message: '댓글 조회 성공',
      data: result,
      now: now(),
    });
  } catch (error) {
    return badRequest(res, '댓글 조회 실패', error);
  }
});

/**
 * @swagger
 * /api/admin/comments:
 *   post:
 *     summary: 댓글 생성
 *     tags: [admin/comments]
 *     requestBody:
 *       description: 댓글 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/document"
 *     responses:
 *       allOf:
 *       - $ref: '#/components/responses/All'
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               message: "댓글 생성 성공"
 */

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const requestInfo = {
      member_srl: 1,
      nick_name: '승열',
      ipaddress: req.ip,
      user_agent: req.headers['user-agent'],
      updated_at: now()
    };


    
    comment_srl: { example: '댓글키'},
    content: { example: '내용'},
    fileNames: { type: "array", example: ["07ce0660-4d82-4a16-ae1f-73e78a615632.jpg", "12bb527c-4530-4ed8-ad80-07c5e1281078.jpg"] },
    deleteFiles: { type: "array", example: ["3", "4"] }
    // if (!body.module_srl) return badRequest(res, '모듈을 선택해주세요');
    // if (!body.title) return badRequest(res, '제목을 입력해주세요');
    // if (!body.content) return badRequest(res, '내용을 입력해주세요');

    // const moduleCheck = await modules.findAll({
    //   where: {
    //     module_srl: body.module_srl,
    //   },
    // });

    // if (moduleCheck.length === 0) return badRequest(res, '없는 모듈입니다');

    // const { seq: document_srl } = await sequence.create();

    // const transaction = await sequelize.transaction();

    const updateData = {
      ...requestInfo,
      content: body.content,
    };

    // await comments.create(insertData, { transaction });

    // if (body.fileNames.length > 0) {
    //   // temp 폴더에서 사용될수있는 위치로 파일이동
    //   const uploadFiles = await s3FileCopy(body.fileNames, insertData);

    //   await file_temp.destroy(body.fileNames, { transaction });
    //   await files.create(uploadFiles, { transaction });
    // }

    // await transaction.commit();

    return res.json({
      success: true,
      message: '댓글 생성 성공',
    });
  } catch (error) {
    console.log(error);
    return badRequest(res, '댓글 생성 실패');
  }
});

/**
 * @swagger
 * /api/admin/comments/{srl}:
 *   put:
 *     summary: 댓글 생성
 *     tags: [admin/comments]
 *     parameters:
 *       - in: query
 *         name: srl
 *         required: false
 *         schema:
 *           type: "string"
 *     requestBody:
 *       description: 댓글 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/documentEdit"
 *     responses:
 *       allOf:
 *       - $ref: '#/components/responses/All'
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               message: "댓글 생성 성공"
 */

router.put('/:srl', async (req, res) => {
  try {
    const { srl: comment_srl } = req.params;
    const { body } = req;

    if (!comment_srl) return badRequest(res, 'srl 누락');
    
    const requestInfo = {
      member_srl: 1,
      nick_name: '승열',
      ipaddress: req.ip,
      user_agent: req.headers['user-agent'],
      updated_at: now()
    };
    
    
    if (!body.content) return badRequest(res, '내용을 입력해주세요');

    const commentCheck = await comments.findOne({
      where: {
        comment_srl: body.comment_srl,
      },
    });

    if (!commentCheck) return badRequest(res, '없는 comment 입니다');

    const transaction = await sequelize.transaction();

    const updateData = {
      ...requestInfo,
      content: body.content,
    };

    if (body.fileNames.length > 0) {
      // temp 폴더에서 사용될수있는 위치로 파일이동
      const uploadFiles = await s3FileCopy(
        body.fileNames,
        {
          srl: comment_srl,
          module_srl: commentCheck.module_srl,
          ipaddress: updateData.ipaddress,
          member_srl: updateData.member_srl,
        }
      );
      await files.create(uploadFiles, { transaction });
    }

    if (body.deleteFiles) {
      const where = {
        file_srl: { [Op.in]: body.deleteFiles }
      };
      const getDeleteFile = await files.findAll({
        where,
        attributes: ['path']
      });
      await files.destroy({ where, transaction });

      await s3FileDelete(getDeleteFile.map(x => x.path));
    }

    const uploaded_count = await files.findAll({
      where: { upload_target_srl: document_srl },
    });

    updateData.uploaded_count = uploaded_count.length;

    await comments.update(updateData, {
      where: { comment_srl },
      transaction,
    });

    await transaction.commit();

    return res.json({
      success: true,
      message: '댓글 생성 성공',
    });
  } catch (error) {
    return badRequest(res, '댓글 생성 실패');
  }
});

/**
 * @swagger
 * /api/admin/comments/{srl}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [admin/comments]
 *     parameters:
 *       - in: query
 *         name: srl
 *         required: false
 *         schema:
 *           type: "string"
 *     responses:
 *       allOf:
 *       - $ref: '#/components/responses/All'
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               message: "댓글 삭제 성공"
 */

router.delete('/:srl', async (req, res) => {
  try {
    const { srl } = req.params;

    if (!srl) return badRequest(res, 'srl 누락');

    // const transaction = await sequelize.transaction();

    // const deleteFiles = await files.findAll({
    //   attributes: ['file_srl'],
    //   where: { upload_target_srl: srl },
    // });

    // await files.destroy({
    //   where: { upload_target_srl: srl },
    //   transaction,
    // });

    // await comments.destroy({
    //   where: { document_srl: srl },
    //   transaction,
    // });

    // await transaction.commit();

    // // DB 가 다삭제 됬으니까 파일 삭제

    // if (deleteFiles.length > 0) {
    //   await s3FileDelete(deleteFiles);
    // }

    return res.json({
      success: true,
      message: '댓글 삭제 성공',
    });
  } catch (error) {
    return badRequest(res, '댓글 삭제 실패');
  }
});

module.exports = router;
