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
            { $match: { "dateSubmitted": { $gte: startDate, $lt: endDate } } },
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
                            input: { $range: [0, { $subtract: [endDate, startDate] }, 1000 * 60 * 60 * 24] }, // $range requires an ending value that can be represented as a 32-bit integer, which means the date difference cannot be more than 20 days.
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
                                { $eq: ["$dateRange", "$dateAdded"] }, // if date added and date in range are the same
                                { count: 1 }, // if true increase count by 1
                                { count: 0 } // if false increase count by 0
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
        // let initialTime = new Date(beginDate)
        //     , endTime = new Date(finalDate)
        //     , arrTime = []
        //     , dayMillisec = 24 * 60 * 60 * 1000
        //     ;
        // for (let q = initialTime; q <= endTime; q = new Date(q.getTime() + dayMillisec)) {
        //     arrTime.push(q);
        // }
        // console.log(arrTime);
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
            return { addDate: moment().isoWeek(dateData._id), totalSubmitted: dateData.documentCount };
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
            { $match: { "lastLogin": { $gte: startDate, $lt: endDate } } },
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
                            input: { $range: [0, { $subtract: [endDate, startDate] }, 1000 * 60 * 60 * 24] },
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
                    totalSubmitted: { $sum: "$added.count" }
                }
            }
        ]);

        res.send(data)
    }

};
