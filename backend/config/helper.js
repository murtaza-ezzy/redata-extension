const s3bucket = require('./s3').s3;

module.exports = {
    getSignedUrl(urls) {
        let finalUrls = [];
        for (let url of urls) {
            const signedUrl = s3bucket.getSignedUrl('getObject', {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: url,
                Expires: 3600
            });

            finalUrls.push(signedUrl);
        }
        return finalUrls;
    }
}