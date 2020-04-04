const express = require('express');
const router = require('express-promise-router')();
const TestController = require('./../controllers/testcontroller');

router.route("/testconnection")
    .post(TestController.connection);

router.route('/readImages')
    .post(TestController.readImages)

module.exports = router;