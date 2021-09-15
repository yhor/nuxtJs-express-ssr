import express from 'express';
import { badRequest } from '../../helper/customError';

const { documents } = require('../../models');
const router = express.Router();

 router.get("/", async (req, res) => {
  try {
    const result = await documents.findAll();

    return res.json({
      success: true,
      message: "게시판 조회에 성공하였습니다.",
      data: result
    });
  } catch (error) {
    console.log(error)
    return badRequest(res, "게시판 조회에 실패하였습니다1.", error);
  }
});

module.exports = router;