import express from 'express';

const app = express();

app.post('/', (req, res) => {
  console.debug('/api/');
  res.send('API In');
});

app.get('/test', (req, res) => {
  console.debug('/api/test');
  res.send('API Test2');
});

module.exports = {
  path: '/api',
  handler: app
}