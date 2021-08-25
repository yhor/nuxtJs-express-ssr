import express from 'express';
import dotenv from 'dotenv';

const { swaggerUi, swaggerSpec } = require('./swagger/config');
const app = express();

const path = process.env.NODE_ENV === 'production' ? './api/.env' : './api/.env.development';

dotenv.config({ path });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require("./routes/index");
const boardRouter = require("./routes/admin/board");
const memberRouter = require("./routes/admin/member");
const modulesRouter = require("./routes/admin/modules");
const fileRouter = require("./routes/file");

app.get('/test', (req, res) => {
  console.debug('/api/test');
  res.send('API Test2');
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", indexRouter);
app.use("/admin/board", boardRouter);
app.use("/admin/member", memberRouter);
app.use("/admin/modules", modulesRouter);
app.use("/file", fileRouter);


module.exports = {
  path: '/api',
  handler: app
}

