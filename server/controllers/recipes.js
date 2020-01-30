
const User = require('./../models/user');
const { uploadToGoogleCloud, deleteImageFromGoogleCloud } = require('./../cloud/googleCloud');

module.exports = {
    addMyRecipe: async (req, res, next) => {
        let submittedRecipe = JSON.parse(req.body.myRecipes);
        let picture;
        const accountType = req.body.accountType === "google" ? 'google.email' :
            req.body.accountType === "facebook" ? 'facebook.email' : 'local.email';
        const foundMyRecipeList = await User.findOne({ [accountType]: req.params.email });
        if (req.file !== undefined) {
            const imageUploaded = await uploadToGoogleCloud(req.file);
            picture = `https://storage.googleapis.com/${imageUploaded[0].metadata.bucket}/${imageUploaded[0].metadata.name}`;
        }
        let foundChef = await foundMyRecipeList.myRecipes.filter(chef => {
            return chef.id === submittedRecipe.grandma_Id
        })
        foundChef[0].chefRecipes.push(Object.assign(submittedRecipe, { img: picture, private: true }));
        return await User.findOneAndUpdate({ [accountType]: req.params.email }, {
            "myRecipes": foundMyRecipeList.myRecipes
        }).then((profile) => {
            User.findOne({ [accountType]: req.params.email }).then(function (item) {
                res.send(item)
            });
        }).catch(error => {
            res.send(404)
            return error
        });
    },
    updateMyRecipe: async (req, res, next) => {
        // https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
        const changeRequest = JSON.parse(req.body.myRecipes);
        let picture;
        if (req.file !== undefined) {
            await uploadToGoogleCloud({ file: req.file });

            picture = `https://storage.googleapis.com/grandmas-recipes/_resized_${req.file.originalname}`;
            // console.log(picture)
        }
        const buildUpdateObject = {};
        for (var key in changeRequest) {
            key == 'recipeName' ? Object.assign(buildUpdateObject, { 'myRecipes.$.recipeName': changeRequest[key] }) :
                key == 'families' ? Object.assign(buildUpdateObject, { 'myRecipes.$.families': changeRequest[key] }) :
                    key == 'chefName' ? Object.assign(buildUpdateObject, { 'myRecipes.$.chefName': changeRequest[key] }) :
                        key == 'chefBio' ? Object.assign(buildUpdateObject, { 'myRecipes.$.chefBio': changeRequest[key] }) :
                            key == 'cookingInstructions' ? Object.assign(buildUpdateObject, { 'myRecipes.$.cookingInstructions': changeRequest[key] }) :
                                key == 'img' ? Object.assign(buildUpdateObject, { 'myRecipes.$.img': picture }) :
                                    key == 'chefImage' ? Object.assign(buildUpdateObject, { 'myRecipes.$.chefimage': chefImage }) :
                                        key == 'private' ? Object.assign(buildUpdateObject, { 'myRecipes.$.private': changeRequest[key] }) :
                                            key == 'ingredients' ? Object.assign(buildUpdateObject, { 'myRecipes.$.ingredients': changeRequest[key] }) : null;
        };
        await User.updateOne({ 'myRecipes._id': req.params.id },
            { $set: buildUpdateObject }).then(response => {
                res.send('Updated!')
            }).catch(error => {
                res.sendStatus(404)
                return error
            });
    },
    getMyRecipe: async (req, res, next) => {
        // https://www.youtube.com/watch?v=Kk6Er0c7srU
        // User.countDocuments({ "method": "google" }).then(resp => {
        //     console.log(resp)

        // })
        const recipeOwner = await User.findOne({ "myRecipes._id": req.params.id })
        const foundRecipe = await recipeOwner.myRecipes.filter(item => {
            return item._id == req.params.id
        });
        await res.send(foundRecipe);
    }
}