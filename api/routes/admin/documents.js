import express from 'express';
import { badRequest } from '../../helper/customError';
import { now } from '../../helper/timeHelper';

const { documents } = require('../../models');
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
      now: now()
    });
  } catch (error) {
    console.log('error', error);
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
 *             $ref: "#/definitions/documents"
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
    const insertData = req.body;
    insertData.created_at = now();
    await documents.create(insertData);

    return res.json({
      success: true,
      message: '게시글 생성 성공',
    });
  } catch (error) {
    return badRequest(res, '게시글 생성 실패');
  }
});

module.exports = router;