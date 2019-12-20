const { Storage } = require('@google-cloud/storage');
const keyFilename = './server/config/grandmasRecipes-49091d2bc82f.json';
const projectId = 'grandmasrecipes';
const storage = new Storage({ projectId, keyFilename });
var myBucket = storage.bucket('grandmas-recipes');
// https://cloud.google.com/storage/docs/reference/libraries#client-libraries-install-nodejs
// api requests (GET,POST,DELETE,PUT) =>   https://cloud.google.com/storage/docs/json_api/v1/?apix=true
module.exports = {
    uploadToGoogleCloud: async (req, res, next) => {
        try {
            // storage.getBuckets().then(buckets => {
            //     console.log('Buckets:');
            //     buckets.forEach(bucket => {
            //         console.log(bucket[0].name);

            //     });
            // })
            const imageUploaded = await myBucket.upload(req.path, { public: true });
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