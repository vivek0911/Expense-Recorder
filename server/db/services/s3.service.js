const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
});

const getRegion = (bucket) => {
  const s3 = new AWS.S3();
  const params = { Bucket: bucket };
  return new Promise((resolve, reject) => {
    s3.getBucketLocation(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.uploadFile = (bucket, key, path) => {
  const s3 = new AWS.S3();
  const content = fs.readFileSync(path);
  const params = { Bucket: bucket, Key: key, Body: content };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        // console.log('s3 success', response);
        resolve(response);
      }
    });
  });
};
exports.deleteFile = (bucket, key) => {
  const s3 = new AWS.S3();
  const params = { Bucket: bucket, Key: key };
  return new Promise((resolve, reject) => {
    s3.deleteObjects(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// exports.uploadFile = (bucket, key, path) => { // this will also work, install bluebird
//   const s3 = new AWS.S3();
//   const readFile = Promise.promisify(fs.readFile);
//   return readFile(path)
//     .then((content) => {
//       const params = { Bucket: bucket, Key: key, Body: content };
//       return new Promise((resolve, reject) => {
//         s3.upload(params, (err, response) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(response);
//           }
//         });
//       });
//     });
// };

// https://stackoverflow.com/questions/34960886/are-there-still-reasons-to-use-promise-libraries-like-q-or-bluebird-now-that-we
