const { s3 } = require('../models');
const { sequence } = require('../models');

const createGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-axxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 3) | 8
    return v.toString(16)
  })
}

const fileGuid = async (filename) => {
  const { seq: cid } = await sequence.create()
  const guid = createGuid()
  const makeGuid = String(cid).padStart(12, '0')
  const filePath = makeGuid
    .slice(0, 9)
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1/')
  return {
    cid,
    guid,
    key: `${filePath}/${makeGuid}_${guid}.${filename.split('.').reverse()[0]}`,
  }
}

const s3FileMove = async (fileArray, destBucket, originBucket) => {
  const Datas = fileArray.map(
    (key) =>
      new Promise(async (resolve, reject) => {
        try {
          const filePath = fileGuid(key)

          await s3
            .getObject({ Bucket: originBucket, Key: key })
            .promise()
            .then(async (x) => {
              const params = {
                Body: x.Body,
                Bucket: destBucket,
                Key: filePath.key,
                ACL: 'public-read',
              }
              await s3.putObject(params).promise()
            })

          await s3.deleteObject({ Bucket: originBucket, Key: key }).promise()

          s3.getObject({ Bucket: destBucket, Key: filePath.key })
            .promise()
            .then((x) => {
              const returnData = {
                cid: filePath.cid,
                guid: filePath.guid,
                path: filePath.key,
                name: `${key.split('/').reverse()[0]}`,
                extension: `.${key.split('.').reverse()[0]}`,
                size: x.ContentLength,
                mime_type: x.ContentType,
                reg_date: new Date(),
              }
              resolve(returnData)
            })
        } catch (e) {
          reject(e)
        }
      })
  )
  return await Promise.all(Datas)
}

// 템프에서 사용하는 버킷으로 이동후 파일 삭제

const s3FileCopy = async (fileArray, Bucket) => {
  const Datas = fileArray.map(
    (key) =>
      new Promise(async (resolve, reject) => {
        try {
          const filePath = await fileGuid(key)
          const copyparams = {
            Bucket,
            CopySource: `${Bucket}/temporary/${key}`,
            Key: filePath.key,
            ACL: 'public-read',
          }

          await s3.copyObject(copyparams).promise()
          await s3.deleteObject({ Bucket, Key: key }).promise()

          s3.getObject({ Bucket, Key: filePath.key })
            .promise()
            .then((x) => {
              const returnData = {
                cid: filePath.cid,
                guid: filePath.guid,
                path: filePath.key,
                name: `${key.split('/').reverse()[0]}`,
                extension: `.${key.split('.').reverse()[0]}`,
                size: x.ContentLength,
                mime_type: x.ContentType,
                reg_date: new Date(),
              }
              resolve(returnData)
            })
        } catch (e) {
          reject(e)
        }
      })
  )
  return await Promise.all(Datas)
}

const deleteFile = async (obj) => {
  if (!obj) return '삭제할 파일 없음'
  let file = 0
  let group = 0
  return await Promise.all(
    obj.map(
      (x) =>
        new Promise(async (resolve) => {
          await s3
            .deleteObject({ Bucket: process.env.S3_NAME, Key: x.path })
            .promise()

          // await knex('fileinfo').where(x).del()

          file += 1
          resolve(x.file_group_cid || null)
        })
    )
  ).then(async (groupCids) => {
      // 중복 병합 or 빈값 제거
      groupCids = [...new Set(groupCids)].filter(function (item) {
        return item !== null && item !== undefined && item !== ''
      })
      await Promise.all(
        groupCids.map(
          (groupCid) =>
            new Promise(async (resolve) => {
              const files = await knex('fileinfo').where(
                'file_group_cid',
                groupCid
              )
              if (files.length) resolve()
              await knex('file_group_info').where('cid', groupCid).del()
              group += 1
              resolve()
            })
        )
      )
      return `파일 ${file}, 파일그룹 ${group} 삭제성공`
    })
    .catch((e) => {
      return e.message
    })
}

const s3FileDelete = async (fileArray, originBucket) => {
  return await Promise.all(
    fileArray.map((key) => {
      return new Promise((resolve, reject) => {
        try {
          s3.deleteObject({ Bucket: originBucket, Key: key })
            .promise()
            .then(() => resolve())
        } catch (e) {
          reject(e)
        }
      })
    })
  )
}

module.exports = {
  createGuid,
  s3FileMove,
  s3FileCopy,
  deleteFile,
  s3FileDelete,
}
