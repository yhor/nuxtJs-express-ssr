import express from 'express';
import dotenv from 'dotenv';

const { swaggerUi, swaggerSpec } = require('./swagger/config');
const app = express();

const path = process.env.NODE_ENV === 'production' ? './api/.env' : './api/.env.development';

dotenv.config({ path });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* 어드민 */
const boardRouter = require("./routes/admin/board");
const memberRouter = require("./routes/admin/member");
const modulesRouter = require("./routes/admin/modules");
const documentsRouter = require("./routes/admin/documents");
const commentsRouter = require("./routes/admin/comments");

app.use("/admin/board", boardRouter);
app.use("/admin/member", memberRouter);
app.use("/admin/modules", modulesRouter);
app.use("/admin/documents", documentsRouter);
app.use("/admin/comments", commentsRouter);

/* 공용 */
const fileRouter = require("./routes/file");

app.use("/file", fileRouter);

/* 스웨거 && 디폴트페이지 */
app.get('/', (req, res) => {res.send('API Test2')});
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = {
  path: '/api',
  handler: app
}
