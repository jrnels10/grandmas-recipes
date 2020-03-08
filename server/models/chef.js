const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const chefSchema = new Schema({
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