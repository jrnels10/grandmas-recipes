'use strict';
const { Storage } = require('@google-cloud/storage');
const keyFilename = process.env.NODE_ENV === "production" ? process.env.GOOGLE_APPLICATION_CREDENTIALS : './server/config/grandmasRecipes-49091d2bc82f.json';
const projectId = 'grandmasrecipes';
const bucketName = process.env.NODE_ENV === "production" ? 'grandmas-recipes' : 'grandma-recipes-dev';
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
// https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload
// https://googleapis.dev/nodejs/storage/latest/File.html#createWriteStream
// https://cloud.google.com/storage/docs/reference/libraries#client-libraries-install-nodejs
// api requests (GET,POST,DELETE,PUT) =>   https://cloud.google.com/storage/docs/json_api/v1/?apix=true
module.exports = {
    uploadToGoogleCloud: async (req, res, next) => {
        try {
            const { filename: filename, } = req.file
            await sharp(req.file.path)
                .resize(600)
                .jpeg({ quality: 100 })
                .toFile(
                    path.resolve(req.file.destination, `_resized_${filename}`)
                )
            fs.unlinkSync(req.file.path)
            const gcsname = `_resized_${req.file.originalname}`;
            const storage = new Storage({ projectId, keyFilename });
            const allBuckets = storage.getBuckets();
            console.log(allBuckets)
            const bucket = await storage.bucket(bucketName)
            const file = bucket.file(gcsname);
            let status = 'hello';
            const myStream = fs.createReadStream(`./server/uploads/_resized_${req.file.originalname}`)
            myStream.pipe(file.createWriteStream({
                metadata: {
                    contentType: 'image/jpeg',
                    metadata: {
                        custom: 'metadata'
                    }
                }
            }));
            return await streamToPromise(myStream);
        } catch (err) {
            console.error('ERROR:', err);
        };
    },
    deleteImageFromGoogleCloud: async (req, res, next) => {
        console.log(req)
        var myBucket = storage.bucket('grandmas-recipes')
        // return myBucket.deleteFiles(name?:req);
    }
};

async function streamToPromise(stream) {
    return new Promise(function (resolve, reject) {
        stream.on("end", () => resolve('finished'));
        stream.on("error", reject);
    })
}