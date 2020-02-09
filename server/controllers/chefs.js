const User = require('../models/user');
const Chef = require('../models/chef');
const { uploadToGoogleCloud, deleteImageFromGoogleCloud } = require('../cloud/googleCloud');


async function updateUserWithChef(req, user, chef) {
    console.log(chef)
    const accountType = req.body.accountType === "google" ? 'google.email' :
        req.body.accountType === "facebook" ? 'facebook.email' : 'local.email';
    return await User.findOneAndUpdate({ [accountType]: req.params.email }, {
        "myChefs": [...user.myChefs, chef._id]
    }).then((profile) => {
        console.log('====================add new chef to user completed ====================')
        return User.findOne({ [accountType]: req.params.email })

    }).catch(error => {
        return 404
    });
};

async function findUser(req) {
    const accountType = req.body.accountType === "google" ? 'google.email' :
        req.body.accountType === "facebook" ? 'facebook.email' : 'local.email';
    return await User.findOne({ [accountType]: req.params.email });
};

async function uploadImages(req) {
    if (req.file !== undefined) {
        await uploadToGoogleCloud({ file: req.file });
        console.log('====================chef picture uploaded ====================')
        return `https://storage.googleapis.com/grandmas-recipes/_resized_${req.file.originalname}`;
        // fs.unlinkSync(`_resized_${req.file.path}`)
    }
};


async function returnUserWithChefsAndRecipes(user) {
    const allChefsThatBelongToUser = await Promise.all(
        user.myChefs.map(async (chefId) => {
            const chef = await Chef.find({ _id: chefId });
            return chef[0];
        })
    );
    return {
        user: user, chefs: allChefsThatBelongToUser, recipes: []
    }
}


//=====================
// controller functions
//=====================

module.exports = {
    // =======================================================
    // =======================================================
    // =================  find chef  =========================
    // =======================================================
    // =======================================================

    findMyChef: async (req, res, next) => {
        try {
            const foundGrandmaList = await User.findOne({ 'myRecipes._id': req.params.id })
            const foundChef = foundGrandmaList.myRecipes.filter(item => {
                return item._id == req.params.id
            })
            res.send(foundChef)
        } catch (error) {
            res.send({ error: error, errorMessage: 'Cannot find chef' })
        }
    },


    // =======================================================
    // =======================================================
    // ==================  add chef  =========================
    // =======================================================
    // =======================================================



    addMyChef: async (req, res, next) => {
        try {
            let chefImage = '';
            const { submittedBy, chefName, _id, chefBio, familyName } = JSON.parse(req.body.myChef)
            const foundUser = await findUser(req);
            const foundChef = await Chef.findOne({ '_id': _id });
            if (foundUser && foundChef) {
                return res.status(403).send({ error: 'Chef already exists' })
            }
            else if (foundUser) {
                if (req.file) {
                    chefImage = await uploadImages(req);
                }
                const newChef = new Chef({
                    chefOwner: submittedBy,
                    chefOwnerId: foundUser._id,
                    chefImage: chefImage,
                    chefName: chefName,
                    dateSubmitted: new Date(),
                    chefBio: chefBio,
                    submittedBy: submittedBy,
                    familyName: familyName,
                    chefRecipes: []
                });
                const savedChef = await newChef.save();
                console.log('====================add new chef completed ====================')
                const updatedUser = await updateUserWithChef(req, foundUser, savedChef);
                const userResponse = await returnUserWithChefsAndRecipes(updatedUser);
                res.send(userResponse);
            } else {
                return res.status(403).send({ error: 'User does not exist.' })
            }
        } catch (error) {
            console.log('++++++++++++++ Error in addMyChef +++++++++++++++')
            console.log(error)
        }
    },



    // =======================================================
    // =======================================================
    // ===============  update chef  =========================
    // =======================================================
    // =======================================================




    updateMyChef: async (req, res, next) => {
        try {
            console.log("============== Update my chef initiated ==================");
            const { _id } = JSON.parse(req.body.myChef)
            const userSubmittedUpdatesToChef = JSON.parse(req.body.myChef);
            const foundChef = await Chef.findOne({ '_id': _id });
            if (foundChef) {
                const buildUpdateObject = { updatedBy: req.params.id };
                if (req.file) {
                    const newChefImage = await uploadImages(req);
                    let chefOldImages = [];
                    if (foundChef.chefOldImages.length > 1) {
                        chefOldImages = foundChef.chefOldImages.filter((oldestImage, idx) => {
                            if (idx > 0) {
                                console.log(oldestImage)
                                deleteImageFromGoogleCloud(oldestImage.substring(oldestImage.lastIndexOf("/") + 1, oldestImage.length))
                            }
                            return idx === 0
                        })
                    } else {
                        chefOldImages = foundChef.chefOldImages
                    }
                    Object.assign(buildUpdateObject, { chefOldImages: [...chefOldImages, foundChef.chefImage] }, { chefImage: newChefImage });
                }
                for (var key in userSubmittedUpdatesToChef) {
                    Object.assign(buildUpdateObject, { [key]: userSubmittedUpdatesToChef[key] });
                };

                await Chef.updateOne({ '_id': _id }, { $set: buildUpdateObject }).catch(error => {
                    res.sendStatus(404)
                    return error
                });
                console.log('====================update chef completed ====================')
                const foundUser = await User.findOne({ '_id': foundChef.chefOwnerId });
                const userResponse = await returnUserWithChefsAndRecipes(foundUser);
                res.send(userResponse);
            }
            else {
                res.status(403).send("Cannot find chef to update.")
            }
        } catch (error) {
            console.log('++++++++++++++ Error in updateMyChef +++++++++++++++')
            console.log(error)
        }
    },

    // =======================================================
    // =======================================================
    // ===============  delete chef  =========================
    // =======================================================
    // =======================================================



    deleteMyChef: async (req, res, next) => {
        try {
            console.log("============== delete my chef initiated ==================")
            const foundChef = await Chef.findOne({ '_id': req.body._id });
            const foundUser = await User.findOne({ '_id': req.params.id });

            if (foundChef.chefOwnerId == foundUser._id) {
                console.log('chef owner and user match')
                Chef.deleteOne({ '_id': req.body._id })
                await User.findOneAndUpdate({ '_id': req.params.id }, {
                    "myChefs": foundUser.myChefs.filter(chef => { chef !== foundChef._id })
                });
                console.log('====================delete my chef completed ====================');
                const userResponse = await returnUserWithChefsAndRecipes(foundUser);
                res.send(userResponse);
            }
            else {
                res.status(403).send("You are not the owner of the chef. Only the chef owner can delete this record.")
            };
        } catch (error) {
            console.log('++++++++++++++ Error in deleteMyChef +++++++++++++++');
            console.log(error);
        }
    }

};
