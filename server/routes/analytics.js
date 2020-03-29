const express = require('express');
const router = require('express-promise-router')();
const upload = require('./imageStorage');
const AnalyticsController = require('../controllers/analytics');
const { validateMyChef, schema } = require('../helpers/routeHelpers');



router.route('/getDataByDates')
    .post(AnalyticsController.getSubmittedDataByDates);


router.route('/getDataByDayWithinDates')
    .post(AnalyticsController.getSubmittedDataByDayWithinDates);

router.route('/getDataByWeekWithinDates')
    .post(AnalyticsController.getSubmittedDataByWeekWithinDates);

router.route('/getlastLoginDataByDayWithinDates')
    .post(AnalyticsController.getlastLoginDataByDayWithinDates);


// router.route('/test')
//     .post(AnalyticsController.test);

module.exports = router;
