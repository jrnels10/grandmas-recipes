const express = require('express');
const router = require('express-promise-router')();
const upload = require('./imageStorage');
const ChefController = require('../controllers/chefs');



router.route('/addmychef/:email')
    .put(upload.single('picture'), ChefController.addMyChef);

router.route('/findmychef/:id')
    .post(ChefController.findMyChef);

module.exports = router;