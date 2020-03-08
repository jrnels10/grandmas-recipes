const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const recipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true
    },
    dateSubmitted: {
        type: Date,
        required: true
    },
    recipeOldImages: [
        { type: String }
    ],
    recipeDescription: {
        type: String
    },
    submittedBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String
    },
    recipeOwnerId: {
        type: String,
        required: true
    },
    chefId: {
        type: String,
        required: true
    },
    groups: [],
    recipeImage: {
        type: String
    },
    ingredients: [{
        ingredient: {
            type: String
        }
    }],
    cookingInstructions: {
        type: String
    },
    private: Boolean

});

const Recipe = process.env.NODE_ENV !== 'development' ? mongoose.model('devRecipe', recipeSchema) : mongoose.model('prodRecipe', recipeSchema);

module.exports = Recipe;