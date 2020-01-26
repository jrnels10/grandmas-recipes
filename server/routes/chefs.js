const express = require('express');
const router = require('express-promise-router')();
const sharp = require("sharp");
const upload = require('./imageStorage');
const ChefController = require('../controllers/chefs');

// function formatImage(image){
//     sharp('input.jpg')
//   .resize(300, 200)
//   .toFile('output.jpg', function(err) {
//     // output.jpg is a 300 pixels wide and 200 pixels high image
//     // containing a scaled and cropped version of input.jpg
//   });
// }


router.route('/addmychef/:email')
    .put(upload.single('picture'), ChefController.addMyChef);

router.route('/findmychef/:id')
    .post(ChefController.findMyChef);

module.exports = router;