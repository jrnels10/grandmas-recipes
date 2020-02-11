const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const chefSchema = new Schema({
    chefOwner: {
        type: String,
        required: true
    },
    chefOwnerId: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    dateSubmitted: {
        type: Date,
        required: true
    },
    chefBio: {
        type: String
    },
    submittedBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: true
    },
    familyName: {
        type: String
    },
    chefRecipes: [{
        type: String
    }]

    // myFamilies: [{
    //     familyName: {
    //         type: String
    //     },
    //     founder: {
    //         type: String
    //     },
    //     familyChefs: [{
    //         chefName: {
    //             type: String
    //         },
    //         chefId: {
    //             type: String
    //         }
    //     }],
    //     familyMembers: [{
    //         memberName: {
    //             type: String
    //         },
    //         memberId: {
    //             type: String
    //         }
    //     }]
    // }]
    // index: { unique: true }
});


const Chef = process.env.NODE_ENV === "production" ? mongoose.model('chef', chefSchema) : mongoose.model('devChef', chefSchema);
module.exports = Chef;