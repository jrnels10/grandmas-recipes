const User = require('../models/user');
const { uploadToGoogleCloud, deleteImageFromGoogleCloud } = require('../cloud/googleCloud');
const sharp = require('sharp');
const path = require('path')
const fs = require('fs');

module.exports = {
    findMyChef: async (req, res, next) => {
        try {
            const foundGrandmaList = await User.findOne({ 'myRecipes._id': req.params.id })
            const foundChef = foundGrandmaList.myRecipes.filter(item => {
                return item._id == req.params.id
            })
            res.send(foundChef)
        } catch (error) {
            res.send({ error: error, errorMessage: 'Cannot find chef' })
        }
    },
    addMyChef: async (req, res, next) => {
        const { filename: filename } = req.file
        try {
            // console.log('test')
            console.log('====================add new chef controller====================')
            console.log(req.file)
            await sharp(req.file.path)
                .resize(500)
                .jpeg({ quality: 100 })
                .toFile(
                    path.resolve(req.file.destination, `_resized_${filename}`)
                )
            fs.unlinkSync(req.file.path)
            let mine = req.body.myRecipes;
            let picture;
            const accountType = req.body.accountType === "google" ? 'google.email' :
                req.body.accountType === "facebook" ? 'facebook.email' : 'local.email';
            const foundGrandmaList = await User.findOne({ [accountType]: req.params.email })
            if (req.file !== undefined && accountType !== undefined) {
                await uploadToGoogleCloud({ file: req.file });
                picture = `https://storage.googleapis.com/grandmas-recipes/_resized_${req.file.originalname}`;
                console.log('====================chef picture uploaded controller====================')
                // fs.unlinkSync(`_resized_${req.file.path}`)
            }

            let myRecipes = foundGrandmaList.myRecipes;
            myRecipes.push(Object.assign(JSON.parse(mine), { chefImage: picture }));
            return await User.findOneAndUpdate({ [accountType]: req.params.email }, {
                "myRecipes": myRecipes
            }).then((profile) => {
                User.findOne({ [accountType]: req.params.email }).then(function (item) {
                    res.send(item)
                });
                console.log('====================add new completed controller====================')

            }).catch(error => {
                res.send(404)
                return error
            });
        } catch (error) {
            console.log(error)
            res.send({ error: error, errorMessage: 'Cannot add chef, this could be due to invalid email.' })
        }
    }
}