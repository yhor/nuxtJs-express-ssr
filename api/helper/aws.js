const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  region: 'ap-northeast-2',
  signatureVersion: 'v4',
});

module.exports = {
  s3
}
