const { sequence } = require('../models');
const { s3 } = require('./aws');
const { S3_BUCKET: bucket, S3_REGION: region } = process.env;

const createGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-axxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 3) | 8;
    return v.toString(16);
  });
};

const fileGuid = async (filename) => {
  const { seq: srl } = await sequence.create();
  const guid = createGuid();
  const makeGuid = String(srl).padStart(12, '0');
  const filePath = makeGuid
    .slice(0, 9)
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1/');
  return {
    srl,
    guid,
    key: `${filePath}/${makeGuid}_${guid}.${filename.split('.').reverse()[0]}`,
  };
};

const s3FileCopy = async (fileArray, document) => {
  const { document_srl, module_srl, ipaddress, member_srl } = document;
  if (!document_srl) return Promise.reject(new Error('document_srl 누락'));
  if (!module_srl) return Promise.reject(new Error('module_srl 누락'));
  if (!ipaddress) return Promise.reject(new Error('ipaddress 누락'));
  if (!member_srl) return Promise.reject(new Error('member_srl 누락'));

  const datas = fileArray.map((key) => {
    return new Promise(async (resolve, reject) => {
      try {
        const filePath = await fileGuid(key);
        const copyparams = {
          Bucket: bucket,
          CopySource: `${Bucket}/temporary/${key}`,
          Key: filePath.key,
          ACL: 'public-read',
        };

        await s3.copyObject(copyparams).promise();
        await s3.deleteObject({ Bucket, Key: key }).promise();

        s3.getObject({ Bucket, Key: filePath.key })
          .promise()
          .then((x) => {
            const name = key.split('/').reverse()[0];
            const returnData = {
              name,
              file_srl: filePath.srl,
              upload_target_srl: document_srl,
              sid: createGuid(),
              module_srl,
              member_srl,
              ipaddress,
              path: filePath.key,
              ext: name.split('.')[1],
              provider: 's3',
              file_size: x.ContentLengthm,
              s3_region: region,
              s3_bucket: bucket,
              s3_download_url: `https://${bucket}.s3.${region}.amazonaws.com/${filePath.key}`,
            };
            resolve(returnData);
          });
      } catch (e) {
        reject(e);
      }
    });
  });
  return await Promise.all(datas);
};

const s3FileDelete = async (fileArray) => {
  return await Promise.all(
    fileArray.map((key) => {
      return new Promise((resolve, reject) => {
        try {
          s3.deleteObject({ Bucket: bucket, Key: key })
            .promise()
            .then(() => resolve());
        } catch (e) {
          reject(e);
        }
      });
    })
  );
};

module.exports = {
  createGuid,
  s3FileCopy,
  s3FileDelete,
};
