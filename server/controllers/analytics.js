const User = require('../models/user');
const Chef = require('../models/chef');
const Recipe = require('../models/recipe');
const Family = require('../models/family');
const moment = require('moment');




//=====================
// controller functions
//=====================

module.exports = {
    // =======================================================
    // =======================================================
    // =================  find chef  =========================
    // =======================================================
    // =======================================================

    getSubmittedDataByDates: async (req, res, next) => {
        const { dataType, beginDate, endDate } = req.body;
        console.log(beginDate)
        if (dataType === 'Chef') {
            const dataFromDates = await Chef.find({ "dateSubmitted": { $gte: new Date(beginDate), $lt: new Date(endDate) } });
            console.log('data by dates: ', dataFromDates)
            res.send(dataFromDates)
        }
    },

    getSubmittedCountOfDataByDates: async (req, res, next) => {
        const { dataType, beginDate, endDate } = req.body;
        console.log(beginDate)
        if (dataType === 'Chef') {
            const dataFromDates = await Chef.count({ "dateSubmitted": { $gte: new Date(beginDate), $lt: new Date(endDate) } });
            console.log('data by dates: ', dataFromDates)
            res.send(dataFromDates)
        }
    },

    // =======================================================
    // =======================================================
    // ==================  add chef  =========================
    // =======================================================
    // =======================================================



    getSubmittedDataByDayWithinDates: async (req, res, next) => {
        const { dataType, beginDate, finalDate } = req.body;
        const startDate = new Date(beginDate);
        const endDate = new Date(finalDate);
        let ModelSelected;
        switch (dataType) {
            case 'Chef':
                ModelSelected = require('../models/chef');
                break;
            case 'User':
                ModelSelected = require('../models/user');
                break;
            case 'Recipe':
                ModelSelected = require('../models/recipe');
                break;
            case 'Family':
                ModelSelected = require('../models/family');
        };
        const data = await ModelSelected.aggregate([
            { $match: { "dateSubmitted": { $gte: new Date(beginDate), $lt: endDate } } },
            {
                $addFields: {
                    dateAdded: {
                        $dateFromParts: {
                            year: { $year: "$dateSubmitted" },
                            month: { $month: "$dateSubmitted" },
                            day: { $dayOfMonth: "$dateSubmitted" }
                        }
                    },
                    dateRange: {
                        $map: {
                            input: { $range: [0, { $subtract: [new Date(), startDate] }, 1000 * 60 * 60 * 24] },
                            in: { $add: [startDate, "$$this"] }
                        }
                    }
                }
            },
            { $unwind: "$dateRange" },
            {
                $group: {
                    _id: "$dateRange",
                    added: {
                        $push: {
                            $cond: [
                                { $eq: ["$dateRange", "$dateAdded"] },
                                { make: "$dateSubmitted", count: 1 },
                                { count: 0 }
                            ]
                        }
                    }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    addDate: "$_id",
                    totalSubmitted: { $sum: "$added.count" }
                }
            }
        ]);

        res.send(data)
    },

    getSubmittedDataByWeekWithinDates: async (req, res, next) => {
        const { dataType, beginDate, finalDate } = req.body;
        const startDate = new Date(beginDate);
        const endDate = new Date(finalDate);
        let ModelSelected;
        switch (dataType) {
            case 'Chef':
                ModelSelected = require('../models/chef');
                break;
            case 'User':
                ModelSelected = require('../models/user');
                break;
            case 'Recipe':
                ModelSelected = require('../models/recipe');
                break;
            case 'Family':
                ModelSelected = require('../models/family');
        };
        const data = await ModelSelected.aggregate([
            { $match: { "dateSubmitted": { $gte: new Date(beginDate), $lt: endDate } } },
            {
                $group: {
                    _id: { $week: '$dateSubmitted' },
                    documentCount: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        const date = data.map(dateData => {
            return { addDate: moment('2020').add(dateData._id, 'weeks'), totalSubmitted: dateData.documentCount };
        });
        res.send(date)
    },

    getlastLoginDataByDayWithinDates: async (req, res, next) => {
        const { dataType, beginDate, finalDate } = req.body;
        const startDate = new Date(beginDate);
        const endDate = new Date(finalDate);
        let ModelSelected;
        switch (dataType) {
            case 'Chef':
                ModelSelected = require('../models/chef');
                break;
            case 'User':
                ModelSelected = require('../models/user');
                break;
            case 'Recipe':
                ModelSelected = require('../models/recipe');
                break;
            case 'Family':
                ModelSelected = require('../models/family');
        };
        const data = await ModelSelected.aggregate([
            { $match: { "lastLogin": { $gte: new Date(beginDate), $lt: endDate } } },
            {
                $addFields: {
                    dateAdded: {
                        $dateFromParts: {
                            year: { $year: "$lastLogin" },
                            month: { $month: "$lastLogin" },
                            day: { $dayOfMonth: "$lastLogin" }
                        }
                    },
                    dateRange: {
                        $map: {
                            input: { $range: [0, { $subtract: [new Date(), startDate] }, 1000 * 60 * 60 * 24] },
                            in: { $add: [startDate, "$$this"] }
                        }
                    }
                }
            },
            { $unwind: "$dateRange" },
            {
                $group: {
                    _id: "$dateRange",
                    added: {
                        $push: {
                            $cond: [
                                { $eq: ["$dateRange", "$dateAdded"] },
                                { make: "$lastLogin", count: 1 },
                                { count: 0 }
                            ]
                        }
                    }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    addDate: "$_id",
                    loginCount: { $sum: "$added.count" }
                }
            }
        ]);

        res.send(data)
    },

};
