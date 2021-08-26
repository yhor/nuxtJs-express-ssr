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

// const s3FileMove = async (fileArray, destBucket, originBucket) => {
//   const Datas = fileArray.map(
//     (key) =>
//       new Promise(async (resolve, reject) => {
//         try {
//           const filePath = fileGuid(key);

//           await s3
//             .getObject({ Bucket: originBucket, Key: key })
//             .promise()
//             .then(async (x) => {
//               const params = {
//                 Body: x.Body,
//                 Bucket: destBucket,
//                 Key: filePath.key,
//                 ACL: 'public-read',
//               };
//               await s3.putObject(params).promise();
//             });

//           await s3.deleteObject({ Bucket: originBucket, Key: key }).promise();

//           s3.getObject({ Bucket: destBucket, Key: filePath.key })
//             .promise()
//             .then((x) => {
//               const name = key.split('/').reverse()[0];
//               const returnData = {
//                 name,
//                 file_srl: filePath.srl,
//                 upload_target_srl: document_srl,
//                 module_srl,
//                 member_srl,
//                 ipaddress,
//                 path: filePath.key,
//                 ext: name.split('.')[1],
//                 provider: 's3',
//                 file_size: x.ContentLengthm,
//                 s3_region: region,
//                 s3_bucket: bucket,
//                 s3_download_url: `https://${bucket}.s3.${region}.amazonaws.com/${filePath.key}`
//               };
//               resolve(returnData);
//             });
//         } catch (e) {
//           reject(e);
//         }
//       })
//   );
//   return await Promise.all(Datas);
// };

// 템프에서 사용하는 버킷으로 이동후 파일 삭제

const s3FileCopy = async (fileArray, obj) => {
  const { srl, module_srl, ipaddress, member_srl } = obj;
  if (!srl) return Promise.reject(new Error('srl 누락'));
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
              upload_target_srl: srl,
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

const deleteFile = async (obj) => {
  if (!obj) return '삭제할 파일 없음';
  let file = 0;
  return await Promise.all(
    obj.map(
      (x) =>
        new Promise(async (resolve) => {
          await s3
            .deleteObject({ Bucket: bucket, Key: x.path })
            .promise();

          await files.destroy({ where: x });

          file += 1;
          resolve(x.file_group_cid || null);
        })
    )
  )
    .then(() => {
      return `파일 ${file} 삭제성공`;
    })
    .catch((e) => {
      return e.message;
    });
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
  // s3FileMove,
  s3FileCopy,
  deleteFile,
  s3FileDelete,
};
