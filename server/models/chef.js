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
    chefPrivate: {
        type: Boolean
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


const Chef = process.env.NODE_ENV === "production" ? mongoose.model('prodChef', chefSchema) : mongoose.model('devChef', chefSchema);
module.exports = Chef;