const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const chefSchema = new Schema({
    chefOwner: {
        type: String
    },
    chefImage: {
        type: String
    },
    chefName: {
        type: String
    },
    dateSubmitted: {
        type: Date
    },
    chefBio: {
        type: String
    },
    submittedBy: {
        type: String
    },
    familyName: {
        type: String
    },
    chefRecipes: [{
        recipeName: {
            type: String
        },
        dateSubmitted: {
            type: Date
        },
        recipeDescription: {
            type: String
        },
        submittedBy: {
            type: String
        },
        img: {
            type: String
        },
        ingredients: [{
            ingredient: {
                type: String
            },
            amount: {
                type: Number
            },
            units: {
                type: String
            }
        }],
        cookingInstructions: {
            type: String
        },
        private: Boolean
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


const Chef = process.env.NODE_ENV === "production" ? mongoose.model('user', chefSchema) : mongoose.model('dev', chefSchema);
module.exports = Chef;