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
});


const Chef = process.env.NODE_ENV !== 'development' ? mongoose.model('devChef', chefSchema) : mongoose.model('prodChef', chefSchema);
module.exports = Chef;