import express from 'express';
import { badRequest } from '../../helper/customError';
import { now } from '../../helper/timeHelper';
import { s3FileCopy } from '../../helper/fileHelper';

const {
  documents,
  modules,
  sequence,
  sequelize,
  files
} = require('../../models');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: admin/documents
 *   description: 게시글
 */

/**
 * @swagger
 * /api/admin/documents:
 *   get:
 *     summary: 게시글 리스트
 *     tags: [admin/documents]
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
 *               message: "게시글 조회 성공"
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
    const queryCondition = req.query;

    const result = await documents.findAll({ where: queryCondition });

    return res.json({
      success: true,
      message: '게시글 조회 성공',
      data: result,
      now: now(),
    });
  } catch (error) {
    return badRequest(res, '게시글 조회 실패', error);
  }
});

/**
 * @swagger
 * /api/admin/documents:
 *   post:
 *     summary: 게시글 생성
 *     tags: [admin/documents]
 *     requestBody:
 *       description: 게시글 정보
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
 *               message: "게시글 생성 성공"
 */

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    
    const requestInfo = {
      member_srl: 1,
      nick_name: '승열',
      ipaddress: req.ip
    }
    

    if (!body.module_srl) return badRequest(res, '모듈을 선택해주세요');
    if (!body.title) return badRequest(res, '제목을 입력해주세요');
    if (!body.content) return badRequest(res, '내용을 입력해주세요');

    const moduleCheck = await modules.findAll({
      where: {
        module_srl: body.module_srl,
      },
    });

    if (moduleCheck.length === 0) return badRequest(res, '없는 모듈입니다');

    const { seq: document_srl } = await sequence.create();

    const transaction = await sequelize.transaction();

    const insertData = {
      ...requestInfo,
      document_srl,
      module_srl: body.module_srl,
      title: body.title,
      content: body.content,
    };

    await documents.create(insertData, { transaction });

    if (body.fileNames.length > 0) {
      // temp 폴더에서 사용될수있는 위치로 파일이동
      const uploadFiles = await s3FileCopy(body.fileNames, insertData);

      await files.create(uploadFiles, { transaction });
    }

    await transaction.commit();

    return res.json({
      success: true,
      message: '게시글 생성 성공',
    });
  } catch (error) {
    console.log(error);
    return badRequest(res, '게시글 생성 실패');
  }
});

module.exports = router;
