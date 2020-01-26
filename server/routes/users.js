const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportSetup = require('../passport-setup');
const User = require('./../models/user');
const path = require('path');


const { validateBody, schema } = require('../helpers/routeHelpers');
const UserController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
// const passportGoogle = passport.authenticate('google-token', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const multer = require('multer');
let storage;
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


router.route("/signup")
    .post(validateBody(schema.authSchema), UserController.signUp);

router.route('/signin')
    .post(validateBody(schema.authSchema), passportSignIn, UserController.signIn);

router.route('/oauth/google')
    .post(passport.authenticate('google-token', { session: false }), UserController.googleOAuth);

router.route('/oauth/facebook')
    .post(passportFacebook, UserController.facebookOAuth);

router.route('/secret')
    .get(passportJWT, UserController.secret);

router.route('/getUsersById')
    .post(UserController.getUsersById);


module.exports = router;