const express = require('express');
const router = require('express-promise-router')();
const upload = require('./imageStorage');
const AnalyticsController = require('../controllers/analytics');
const { validateMyChef, schema } = require('../helpers/routeHelpers');



router.route('/getDataByDates')
    .post(AnalyticsController.getDataByDates);

module.exports = router;
