const express = require('express');
const router = require('express-promise-router')();
const upload = require('./imageStorage');
const FamilyController = require('../controllers/families');
// const { validateMyFamilies, schema } = require('../helpers/routeHelpers');



router.route('/createmyfamily/:id')
    .post(upload.single('picture'), FamilyController.createMyFamily);

router.route('/addmembertofamily/:id')
    .post(FamilyController.addMemberToFamily);

// router.route('/updatemychef/:id')
//     .put(upload.single('picture'), FamilyController.updateMyChef);

// router.route('/deletemychef/:id')
//     .delete(FamilyController.deleteMyChef);

router.route('/findmyfamily/:id')
    .post(FamilyController.findMyFamily);

module.exports = router;
