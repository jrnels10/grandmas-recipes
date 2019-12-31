'use strict';
const { Storage } = require('@google-cloud/storage');
const keyFilename = process.env.NODE_ENV === "production" ? process.env.GOOGLE_APPLICATION_CREDENTIALS : './server/config/grandmasRecipes-49091d2bc82f.json';
const { auth, Compute } = require('google-auth-library');
const projectId = 'grandmasrecipes';
// https://cloud.google.com/storage/docs/reference/libraries#client-libraries-install-nodejs
// api requests (GET,POST,DELETE,PUT) =>   https://cloud.google.com/storage/docs/json_api/v1/?apix=true
module.exports = {
    uploadToGoogleCloud: async (req, res, next) => {
        try {
            return ("made it")
            const storage = new Storage({ projectId, keyFilename });
            var myBucket = storage.bucket('grandmas-recipes');
            // storage.getBuckets().then(buckets => {
            //     console.log('Buckets:');
            //     buckets.forEach(bucket => {
            //         console.log(bucket[0].name);

            //     });
            // })
            const imageUploaded = await myBucket.upload(req.path, { public: true });
            console.log(imageUploaded)
            return imageUploaded;
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