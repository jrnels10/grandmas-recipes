const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const recipeSchema = new Schema({
    recipeName: {
        type: String
    },
    dateSubmitted: {
        type: Date
    },
    recipeOldImages: [
        { type: String }
    ],
    recipeDescription: {
        type: String
    },
    submittedBy: {
        type: String
    },
    updatedBy: {
        type: String
    },
    recipeOwnerId: {
        type: String
    },
    chefId: {
        type: String
    },
    groups: [],
    recipeImage: {
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

});

const Recipe = process.env.NODE_ENV !== 'development' ? mongoose.model('devRecipe', recipeSchema) : mongoose.model('recipe', recipeSchema);
module.exports = Recipe;