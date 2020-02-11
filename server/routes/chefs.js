const express = require('express');
const router = require('express-promise-router')();
const upload = require('./imageStorage');
const ChefController = require('../controllers/chefs');
const { validateMyChef, schema } = require('../helpers/routeHelpers');



router.route('/addmychef/:id')
    .post(upload.single('picture'), validateMyChef(schema.chefSchema), ChefController.addMyChef);

router.route('/updatemychef/:id')
    .put(upload.single('picture'), ChefController.updateMyChef);

router.route('/deletemychef/:id')
    .delete(ChefController.deleteMyChef);

router.route('/findmychef/:id')
    .post(ChefController.findMyChef);

module.exports = router;