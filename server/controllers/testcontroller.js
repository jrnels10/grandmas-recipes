const { readImageWithGoogleCloud } = require('./../cloud/googleCloud');


module.exports = {

    connection: async (req, res, next) => {
        res.status(200).json({ connection: 'connection to backend successful!' })
    },
    readImages: async (req, res, next) => {
        readImageWithGoogleCloud().then(results => {
            res.send(results)
        })
    }
}