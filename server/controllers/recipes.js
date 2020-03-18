
const User = require('./../models/user');
const Chef = require('./../models/chef');
const Recipe = require('./../models/recipe');
const { uploadImages, returnUserWithChefsAndRecipes } = require('./generalFunctions');

const { deleteImageFromGoogleCloud } = require('./../cloud/googleCloud');


module.exports = {
    addMyRecipe: async (req, res, next) => {
        console.log('====================recipe adding initiated ====================')
        const { recipeDescription, recipeName, cookingInstructions, ingredients, chefId, groups } = JSON.parse(req.body.myRecipes);
        let recipeImage = '';
        const foundUser = await User.findOne({ '_id': req.params.id });
        const foundChef = await Chef.findOne({ '_id': chefId });
        if (req.file) {
            recipeImage = await uploadImages(req);
        }
        const newRecipe = new Recipe({
            recipeName: recipeName,
            recipeDescription: recipeDescription,
            chefId: chefId,
            recipeOwnerId: req.params.id,
            groups: groups,
            dateSubmitted: new Date(),
            recipeImage: recipeImage,
            submittedBy: req.params.id,
            cookingInstructions: cookingInstructions,
            ingredients: ingredients,
            private: true,
            liked: 0
        });
        const savedRecipe = await newRecipe.save();
        await Chef.findOneAndUpdate({ '_id': chefId }, {
            "chefRecipes": [...foundChef.chefRecipes, savedRecipe._id]
        }).catch(error => {
            console.log(error)
            return error
        });
        res.send(savedRecipe);
    },
    updateMyRecipe: async (req, res, next) => {
        // https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
        const userSubmittedUpdatesToRecipe = JSON.parse(req.body.myRecipes);
        const recipeFound = await Recipe.findOne({ '_id': userSubmittedUpdatesToRecipe.recipeId });
        console.log(userSubmittedUpdatesToRecipe)
        if (recipeFound) {
            const buildUpdateObject = { updatedBy: req.params.id };
            if (req.file !== undefined) {
                const newRecipeImage = await uploadImages(req);
                let recipeOldImages = [];
                if (recipeFound.recipeOldImages.length > 1) {
                    recipeOldImages = recipeFound.recipeOldImages.filter((oldestImage, idx) => {
                        if (idx > 0) {
                            try {
                                deleteImageFromGoogleCloud(oldestImage.substring(oldestImage.lastIndexOf("/") + 1, oldestImage.length))
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        return idx === 0
                    })
                } else {
                    recipeOldImages = recipeFound.recipeOldImages;
                }
                Object.assign(buildUpdateObject, { recipeOldImages: [...recipeOldImages, recipeFound.recipeImage] }, { recipeImage: newRecipeImage });
            }
            for (var key in userSubmittedUpdatesToRecipe) {
                Object.assign(buildUpdateObject, { [key]: userSubmittedUpdatesToRecipe[key] });
            };
            await Recipe.updateOne({ '_id': userSubmittedUpdatesToRecipe.recipeId }, { $set: buildUpdateObject }).catch(error => {
                console.log(error)
                return error
            });
            console.log('====================update recipe completed ====================')
            const foundRecipe = await Recipe.findOne({ '_id': userSubmittedUpdatesToRecipe.recipeId })
            res.send(foundRecipe);
        }
    },
    deleteMyRecipe: async (req, res, next) => {
        try {
            console.log("============== delete my recipe initiated ==================");
            const foundUser = await User.findOne({ '_id': req.params.id });
            const foundRecipe = await Recipe.findOne({ '_id': req.body.recipeId });
            const foundChef = await Chef.findOne({ '_id': foundRecipe.chefId });
            if (foundRecipe.recipeOwnerId == foundUser._id) {
                console.log('recipe owner and user match');
                Recipe.deleteOne({ '_id': req.body.recipeId }).then(async (deleted) => {
                    console.log(deleted)
                    if (foundRecipe.recipeImage !== '') {
                        deleteImageFromGoogleCloud(foundRecipe.recipeImage.substring(foundRecipe.recipeImage.lastIndexOf("/") + 1, foundRecipe.recipeImage.length));
                    }
                    const remainingRecipes = await Promise.all(
                        foundChef.chefRecipes.filter(recipe => { return recipe !== req.body.recipeId })
                    );
                    await Chef.findOneAndUpdate({ '_id': foundRecipe.chefId }, {
                        "chefRecipes": remainingRecipes
                    });

                    res.send('deleted');
                    console.log('====================delete my recipe completed ====================');
                    // const userResponse = await returnUserWithChefsAndRecipes(req.params.id);
                });
            }
            else {
                res.status(403).send("You are not the owner of this recipe. Only the recipe owner can delete this record.");
            };
        } catch (error) {
            console.log('++++++++++++++ Error in deleteMyRecipe +++++++++++++++');
            console.log(error);
        }
    },
    getMyRecipe: async (req, res, next) => {
        // https://www.youtube.com/watch?v=Kk6Er0c7srU 
        // User.countDocuments({ "method": "google" }).then(resp => {
        //     console.log(resp)

        // })
        let recipe = {}
        const recipeFound = await Recipe.findOne({ "_id": req.params.id });
        const { ingredients, recipeImage, cookingInstructions, groups, recipeDescription, recipeName, dateSubmitted, _id } = recipeFound;
        const chefFound = await Chef.findOne({ "chefRecipes": req.params.id });
        Object.assign(recipe, { chefName: chefFound.chefName, ingredients, groups, recipeDescription, recipeImage, cookingInstructions, recipeName, dateSubmitted, _id });
        await res.send(recipe);
    },
    likedMyRecipe: async (req, res, next) => {
        try {
            const foundRecipeInUsersLikedArray = await User.findOne({ '_id': req.body.userId });
            const recipeAlreadyLiked = foundRecipeInUsersLikedArray.recipesLiked.indexOf(req.params.id) >= 0;
            console.log(recipeAlreadyLiked)
            if (recipeAlreadyLiked) {
                console.log('add')

                await User.update(
                    { _id: req.body.userId },
                    { $pull: { recipesLiked: { $in: req.params.id } } }
                ).catch(error => {
                    console.log(error)
                    return error
                });
            } else {
                console.log('remove')
                await User.update(
                    { _id: req.body.userId },
                    { $push: { recipesLiked: req.params.id } }
                ).catch(error => {
                    console.log(error)
                    return error
                });
            }
            console.log("============== user recipe collection liked updated ==================");



            console.log("============== like my recipe initiated ==================");
            const recipeFound = await Recipe.findOne({ "_id": req.params.id });
            const newLikedNumber = recipeAlreadyLiked ? --recipeFound.liked : ++recipeFound.liked;
            console.log(recipeFound, newLikedNumber, foundRecipeInUsersLikedArray)
            await Recipe.updateOne({ '_id': req.params.id }, { $set: { 'liked': newLikedNumber < 1 ? 0 : newLikedNumber } }).catch(error => {
                console.log(error)
                return error
            });
            console.log("============== recipe collection liked updated ==================");

            const recipeFoundAfterLikedCount = await Recipe.findOne({ "_id": req.params.id });
            // const foundUserAfterLiked = await User.findOne({ '_id': req.body.userId });
            res.send({ liked: recipeFoundAfterLikedCount.liked })


        }
        catch (error) {
            console.log('++++++++++++++ Error in likedMyRecipe +++++++++++++++');
            console.log(error);
        }
    }
};