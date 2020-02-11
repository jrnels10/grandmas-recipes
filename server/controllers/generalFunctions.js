const { uploadToGoogleCloud, deleteImageFromGoogleCloud } = require('./../cloud/googleCloud');
const Chef = require('./../models/chef');
const Recipe = require('./../models/recipe');

module.exports = {
    uploadImages: async (req, res, next) => {
        if (req.file !== undefined) {
            await uploadToGoogleCloud({ file: req.file });
            console.log('====================recipe picture uploaded ====================')
            return `https://storage.googleapis.com/grandmas-recipes/_resized_${req.file.originalname}`;
            // fs.unlinkSync(`_resized_${req.file.path}`)
        }
    },
    returnUserWithChefsAndRecipes: async (req, res, next) => {
        if (req.myChefs) {
            const allChefsThatBelongToUser = await Promise.all(
                req.myChefs.map(async (chefId) => {
                    const chef = await Chef.find({ _id: chefId });
                    if (chef[0] && chef[0].chefRecipes) {
                        const allRecipesThatBelongToChef = await Promise.all(
                            chef[0].chefRecipes.map(async (recipeId) => {
                                const recipe = await Recipe.find({ _id: recipeId });
                                return recipe[0];
                            })
                        );
                        return { chef: chef[0], chefRecipes: allRecipesThatBelongToChef };
                    }
                    else {
                        return null;
                    }
                })
            );
            return {
                user: req,
                method: req.method,
                chefs: allChefsThatBelongToUser
            }
        } else {
            return {
                user: req,
                method: req.method,
                chefs: []
            }
        }
    }
}

