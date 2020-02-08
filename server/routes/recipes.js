const express = require('express');
const router = require('express-promise-router')();
const path = require('path');
const upload = require('./imageStorage');



const { validateBody, schema } = require('../helpers/routeHelpers');
const RecipeController = require('../controllers/recipes');

router.route('/addmyrecipe/:email')
    .put(upload.single('picture'), RecipeController.addMyRecipe);

router.route('/deletemyrecipe/:id')
    .delete(RecipeController.deleteMyRecipe);

router.route('/updatemyrecipe/:id')
    .put(upload.single('picture'), RecipeController.updateMyRecipe);

router.route('/getmyrecipe/:id')
    .post(RecipeController.getMyRecipe);

module.exports = router;