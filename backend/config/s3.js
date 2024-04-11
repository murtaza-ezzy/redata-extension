var aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_KEY,
    region: process.env.AWS_REGION
});

exports.s3 = new aws.S3();