const multer = require('multer');
let storage;
let memStorage
if (process.env.NODE_ENV === 'production') {
    // Heroku will not accept folders that are emtpy. So either create folder after push to Heroku
    // or add a file to uploads folder so that it is not empty on Heroku push.

    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../uploads/'));
        },
        filename: function (req, file, cb) {
            if (file === undefined) {

            } else {
                cb(null, file.originalname)
            }
        }
    })
} else {
    memStorage = multer.memoryStorage();

    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (file === undefined) {

            } else {
                cb(null, './server/uploads');
            }
        },
        filename: function (req, file, cb) {
            if (file === undefined) {

            } else {
                cb(null, file.originalname)
            }
        }
    });
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2500 * 2500 * 1
    }
});

module.exports = upload;