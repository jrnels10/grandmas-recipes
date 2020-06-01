'use strict';
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const keyFilename = process.env.NODE_ENV === "production" ? process.env.GOOGLE_APPLICATION_CREDENTIALS : './server/config/grandmasRecipes-49091d2bc82f.json';
const projectId = 'grandmasrecipes';
const bucketName = process.env.NODE_ENV === "production" ? 'grandmas-recipes' : 'grandmas-recipes-dev';
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
// https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload
// https://googleapis.dev/nodejs/storage/latest/File.html#createWriteStream
// https://cloud.google.com/storage/docs/reference/libraries#client-libraries-install-nodejs
// api requests (GET,POST,DELETE,PUT) =>   https://cloud.google.com/storage/docs/json_api/v1/?apix=true
//https://cloud.google.com/vision/docs/libraries
async function getAllBuckets(gcsname) {
    const storage = new Storage({ projectId, keyFilename });
    const bucket = await storage.bucket(bucketName)
    return bucket.file(gcsname);
}


module.exports = {
    uploadToGoogleCloud: async (req, res, next) => {
        console.log("===========upload to google cloud initiated======================")
        try {
            const file = await getAllBuckets(`_resized_${req.file.originalname}`);
            const { filename: filename, } = req.file
            await sharp(req.file.path)
                .resize(600)
                .jpeg({ quality: 100 })
                .toFile(
                    path.resolve(req.file.destination, `_resized_${filename}`)
                )
            fs.unlinkSync(req.file.path)
            const myStream = fs.createReadStream(`./server/uploads/_resized_${req.file.originalname}`)
            myStream.pipe(file.createWriteStream({
                metadata: {
                    contentType: 'image/jpeg',
                    metadata: {
                        custom: 'metadata'
                    }
                }
            }));
            return await streamToPromise(myStream, req.file);
        } catch (err) {
            console.error('ERROR:', err);
        };
    },
    deleteImageFromGoogleCloud: async (req, res, next) => {
        console.log("===========delete from google cloud initiated======================")
        console.log(req)
        const file = await getAllBuckets(`${req}`);
        return file.delete(function (err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log("===========delete from google cloud completed======================")
                return "image deleted";
            }
        })

    },
    readImageWithGoogleCloud: async (req, res, next) => {
        //https://morioh.com/p/0tNONZvfChiS
        const client = new vision.ImageAnnotatorClient();
        // Performs text detection on the local file
        const [result] = await client.textDetection(req.path);
        const detections = result.textAnnotations;
        return detections
    }
};

async function streamToPromise(stream, imagePath) {
    return new Promise(function (resolve, reject) {
        stream.on("end", () => resolve(`https://storage.googleapis.com/${bucketName}/_resized_${imagePath.originalname}`));
        stream.on("error", reject);
        // fs.unlinkSync(imagePath)
    })
}

