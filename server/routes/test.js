const express = require('express');
const router = require('express-promise-router')();
const TestController = require('../controllers/testcontroller');

router.route("/testConnection")
    .post(TestController.connection);

module.exports = router;