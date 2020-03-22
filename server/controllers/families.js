const User = require('../models/user');
const Chef = require('../models/chef');
const Family = require('../models/family');
const { uploadImages, returnUserWithChefsAndRecipes } = require('./generalFunctions');
const { uploadToGoogleCloud, deleteImageFromGoogleCloud } = require('../cloud/googleCloud');


async function updateUserWithFamily(req, user, family) {
    return await User.findOneAndUpdate({ '_id': req.params.id }, {
        "myFamilies": [...user.myFamilies, family._id]
    }).then((profile) => {
        console.log('====================add new family to user completed ====================')
        return User.findOne({ '_id': req.params.id })
    }).catch(error => {
        return 404
    });
};

async function updateChefWithFamily(req, chef, family) {
    return await Chef.findOneAndUpdate({ '_id': chef._id }, {
        "families": [...chef.families, family._id]
    }).then((profile) => {
        console.log('====================add new family to chef completed ====================')
        return User.findOne({ '_id': req.params.id })
    }).catch(error => {
        return 404
    });
};


//=====================
// controller functions
//=====================

module.exports = {
    // =======================================================
    // =======================================================
    // =================  find family  =========================
    // =======================================================
    // =======================================================

    findMyFamily: async (req, res, next) => {
        try {
            const foundFamily = await Family.findOne({ '_id': req.params.id });
            res.send(foundFamily)
        } catch (error) {
            res.send({ error: error, errorMessage: 'Cannot find family' })
        }
    },


    // =======================================================
    // =======================================================
    // ================  create family  ======================
    // =======================================================
    // =======================================================



    createMyFamily: async (req, res, next) => {
        try {
            console.log('add new family initiated')
            const { submittedBy, chefId, familyBio, familyName } = JSON.parse(req.body.myFamily);
            const foundUser = await User.findOne({ '_id': req.params.id });
            const foundChef = await Chef.findOne({ '_id': chefId });
            if (foundUser && foundChef) {
                const newFamily = new Family({
                    familyOwnerName: submittedBy,
                    familyOwner: foundUser._id,
                    chefName: foundChef.chefName,
                    chefId: foundChef._id,
                    dateSubmitted: new Date(),
                    familyBio: familyBio,
                    submittedBy: submittedBy,
                    familyName: familyName,
                    familyMembers: [foundUser._id]
                });
                console.log(req.body.myFamily)
                const savedFamily = await newFamily.save();
                console.log('====================add new Family completed ====================')
                const updatedUser = await updateUserWithFamily(req, foundUser, savedFamily);
                await updateChefWithFamily(req, foundChef, savedFamily);
                const userResponse = await returnUserWithChefsAndRecipes(updatedUser);
                res.send(userResponse);
            }
            else {
                return res.status(400).send({ error: 'User or chef does not exist.' })
            }
        } catch (error) {
            console.log('++++++++++++++ Error in createMyFamily +++++++++++++++')
            console.log(error)
            return res.status(403).send({ error: 'Error in family object. Please contact developer with error.' })
        }
    },



    // =======================================================
    // =======================================================
    // ===============  update family with member=============
    // =======================================================
    // =======================================================

    addMemberToFamily: async (req, res, next) => {
        try {
            console.log("============== Add member to Family initiated ==================");
            const { familyId, newFamilyMember } = req.body;
            const foundUser = await User.findOne({ '_id': newFamilyMember });
            const foundNewFamilyMember = await User.findOne({ '_id': req.params.id });
            const foundFamily = await Family.findOne({ '_id': familyId });
            // console.log(foundFamily, newFamilyMember)
            if (foundUser._id != foundFamily.familyOwner) {
                res.status(403).send({ error: "You do not have permissions to add new family members. Contact the Family creator to add new member" })
            }
            else if (foundFamily.familyMembers.includes(foundNewFamilyMember._id)) {
                res.status(403).send({ error: `${foundNewFamilyMember[foundNewFamilyMember.method].firstName} is already a member of this family.` });
            } else {
                // console.log('remove')
                await Family.updateOne(
                    { _id: foundFamily._id },
                    { $push: { familyMembers: foundNewFamilyMember._id } }
                ).catch(error => {
                    console.log(error)
                    return error
                });
                await User.updateOne(
                    { _id: foundNewFamilyMember._id },
                    { $push: { myFamilies: foundFamily._id, myChefs: foundFamily.chefId } }
                ).catch(error => {
                    console.log(error)
                    return error
                });
                res.send("New family member added!")
            }


            // // const userSubmittedUpdatesToChef = JSON.parse(req.body.myChef);
            // const foundChef = await Chef.findOne({ '_id': chefId });
            // console.log(foundChef)
            // if (foundChef) {
            //     const buildUpdateObject = { updatedBy: req.params.id };
            //     if (req.file) {
            //         const newChefImage = await uploadImages(req);
            //         let chefOldImages = [];
            //         if (foundChef.chefOldImages.length > 1) {
            //             chefOldImages = foundChef.chefOldImages.filter((oldestImage, idx) => {
            //                 if (idx > 0) {
            //                     console.log(oldestImage)
            //                     deleteImageFromGoogleCloud(oldestImage.substring(oldestImage.lastIndexOf("/") + 1, oldestImage.length))
            //                 }
            //                 return idx === 0
            //             })
            //         } else {
            //             chefOldImages = foundChef.chefOldImages
            //         }
            //         Object.assign(buildUpdateObject, { chefOldImages: [...chefOldImages, foundChef.chefImage] }, { chefImage: newChefImage });
            //     }
            //     for (var key in userSubmittedUpdatesToChef) {
            //         Object.assign(buildUpdateObject, { [key]: userSubmittedUpdatesToChef[key] });
            //     };

            //     await Chef.updateOne({ '_id': chefId }, { $set: buildUpdateObject }).catch(error => {
            //         res.sendStatus(404)
            //         return error
            //     });
            //     console.log('====================update chef completed ====================')
            //     const foundUser = await User.findOne({ '_id': foundChef.chefOwnerId });
            //     const userResponse = await returnUserWithChefsAndRecipes(foundUser);
            //     res.send(userResponse);
            // }
            // else {
            //     res.status(403).send("Cannot find chef to update.")
            // }
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
            const foundChef = await Chef.findOne({ '_id': req.body.chefId });
            const foundUser = await User.findOne({ '_id': req.params.id });
            if (foundChef.chefOwnerId == foundUser._id) {
                console.log('chef owner and user match')
                Chef.deleteOne({ '_id': req.body.chefId }).then(async (deleted) => {
                    if (foundChef.chefImage !== '') {
                        deleteImageFromGoogleCloud(foundChef.chefImage.substring(foundChef.chefImage.lastIndexOf("/") + 1, foundChef.chefImage.length));
                    }
                    const remainingChefs = await Promise.all(foundUser.myChefs.filter(chef => {
                        return chef !== req.body.chefId
                    }));
                    await User.findOneAndUpdate({ '_id': req.params.id }, {
                        "myChefs": remainingChefs
                    }).then(async (results) => {
                        const updatedUser = await User.findOne({ '_id': req.params.id });
                        const userResponse = await returnUserWithChefsAndRecipes(updatedUser);
                        res.send(userResponse);
                    })
                    console.log('====================delete my chef completed ====================');
                });
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
