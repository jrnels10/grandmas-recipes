const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const familySchema = new Schema({
    familyName: {
        type: String
    },
    familyOwner: {
        type: String
    },
    chefName: {
        type: String
    },
    chefId: {
        type: String
    },
    familyOwnerName: {
        type: String
    },
    familyMembers: [
        {
            type: String
        }
    ],
    dateSubmitted: {
        type: Date
    },
    dateUpdated: {
        type: Date
    },
    familyBio: {
        type: String
    },
    submittedBy: {
        type: String
    },
    updatedBy: {
        type: String
    }
});

const Family = process.env.NODE_ENV === "production" ? mongoose.model('prodFamily', familySchema) : mongoose.model('devFamily', familySchema);

module.exports = Family;