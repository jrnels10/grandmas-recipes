const sharp = require("sharp");

module.exports = {
    imageFormatting: async (req, res, next) => {
        const image = sharp(req.file)
            .resize(1300, 1200)
            .toFile(`./server/uploads/optimized${req.file.originalname}`, function (err) {
                // console.log(res)
                console.log(err)
                // output.jpg is a 300 pixels wide and 200 pixels high image
                // containing a scaled and cropped version of input.jpg
            })

        console.log('image', image)
    }
}