const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const analyzeSchema = new Schema({
    chefOwner: {
        type: String
    },
    chefOwnerId: {
        type: String
    },
    chefImage: {
        type: String
    },
    chefOldImages: [
        {
            type: String
        }
    ],
    chefName: {
        type: String
    },
    dateSubmitted: {
        type: Date
    },
    dateUpdated: {
        type: Date
    },
    chefBio: {
        type: String
    },
    submittedBy: {
        type: String
    },
    updatedBy: {
        type: String
    },
    familyName: {
        type: String
    },
    chefRecipes: [{
        type: String
    }],
    families: [{
        type: String
    }]
});


const Analyze = process.env.NODE_ENV === "production" ? mongoose.model('prodAnalyze', analyzeSchema) : mongoose.model('devAnalyze', analyzeSchema);
module.exports = Analyze;