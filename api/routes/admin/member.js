import express from 'express';
import { badRequest } from '../../helper/customError';

const { member } = require('../../models');
const router = express.Router();

 router.get("/", async (req, res) => {
  try {
    const result = await member.findAll();

    return res.json({
      success: true,
      message: "맴버 조회에 성공하였습니다.",
      data: result
    });
  } catch (error) {
    return badRequest(res, "맴버 조회에 실패하였습니다.");
  }
});

module.exports = router;