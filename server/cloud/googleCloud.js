'use strict';
const { Storage } = require('@google-cloud/storage');
// const keyFilename = './server/config/grandmasRecipes-49091d2bc82f.json';
// const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const keyFilename = process.env.NODE_ENV === "production" ? process.env.GOOGLE_APPLICATION_CREDENTIALS : './server/config/grandmasRecipes-49091d2bc82f.json';
const projectId = 'grandmasrecipes';
// https://cloud.google.com/storage/docs/reference/libraries#client-libraries-install-nodejs
// api requests (GET,POST,DELETE,PUT) =>   https://cloud.google.com/storage/docs/json_api/v1/?apix=true
module.exports = {
    uploadToGoogleCloud: async (req, res, next) => {
        try {
            let path = req.path;
            const storage = new Storage({ projectId, keyFilename });
            const imageUploaded = await storage.bucket('grandmas-recipes').upload(path, { public: true });
            return (imageUploaded)
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