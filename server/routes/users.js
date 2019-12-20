const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportSetup = require('../passport-setup');
const User = require('./../models/user');



const { validateBody, schema } = require('../helpers/routeHelpers');
const UserController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const multer = require('multer');
const storage = multer.diskStorage({
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
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    }
});


router.route("/signup")
    .post(validateBody(schema.authSchema), UserController.signUp);

router.route('/signin')
    .post(validateBody(schema.authSchema), passportSignIn, UserController.signIn);

router.route('/oauth/google')
    .post(passportGoogle, UserController.googleOAuth);

router.route('/oauth/facebook')
    .post(passportFacebook, UserController.facebookOAuth);

router.route('/secret')
    .get(passportJWT, UserController.secret);

router.route('/getUsersById')
    .post(UserController.getUsersById);

router.route('/update/:email')
    .put(upload.single('profilePicture'), UserController.updateUser);

router.route('/addmyrecipe/:email')
    .put(upload.single('picture'), UserController.addMyRecipe);

router.route('/updatemyrecipe/:id')
    .put(upload.single('picture'), UserController.updateMyRecipe);

router.route('/getmyrecipe/:id')
    .post(UserController.getMyRecipe);

router.route('/uploadGoogleCloud')
    .post(upload.array('picture', 2), UserController.uploadToGoogleCloud)

router.route('/deleteImageFromGoogleCloud/:fileName')
    .delete(UserController.deleteFromGoogleCloud)

module.exports = router;