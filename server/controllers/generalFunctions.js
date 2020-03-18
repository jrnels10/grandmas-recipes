const { uploadToGoogleCloud, deleteImageFromGoogleCloud } = require('./../cloud/googleCloud');
const Chef = require('./../models/chef');
const Recipe = require('./../models/recipe');
const Family = require('./../models/family');

module.exports = {
    uploadImages: async (req, res, next) => {
        if (req.file !== undefined) {
            const imageUrl = await uploadToGoogleCloud({ file: req.file });
            console.log(imageUrl)
            console.log('====================recipe picture uploaded ====================')
            return imageUrl;
            // fs.unlinkSync(`_resized_${req.file.path}`)
        }
    },
    returnUserWithChefsAndRecipes: async (req, res, next) => {
        class userData {
            constructor(id, email, firstName, lastName, profilePicture, recipesLiked, method) {
                this.id = id;
                this.email = email;
                this.firstName = firstName;
                this.lastName = lastName;
                this.recipesLiked = recipesLiked;
                this.profilePicture = profilePicture;
                this.method = method;
                this.chefs = [];
                this.families = [];
                this.fullName = function () {
                    return `${this.firstName} ${this.lastName}`;
                };
            }
        }
        class chefData {
            constructor(chefId, chefName, chefImage, chefBio, dateSubmitted, submittedBy, familyName) {
                this.chefId = chefId;
                this.chefName = chefName;
                this.chefImage = chefImage;
                this.chefBio = chefBio;
                this.dateSubmitted = dateSubmitted;
                this.submittedBy = submittedBy;
                this.familyName = familyName;
                this.chefRecipes = [];
            }
        };

        class familyData {
            constructor(familyName, familyOwnerName, familyId, chefName, familyMembers, dateSubmitted, submittedBy, familyBio) {
                this.familyId = familyId;
                this.familyOwnerName = familyOwnerName;
                this.familyMembers = familyMembers;
                this.chefName = chefName;
                this.familyBio = familyBio;
                this.dateSubmitted = dateSubmitted;
                this.submittedBy = submittedBy;
                this.familyName = familyName;
            }
        };

        const clientData = new userData(
            req._id,
            req[req.method].email,
            req[req.method].firstName,
            req[req.method].lastName,
            req[req.method].profilePicture,
            req.recipesLiked,
            req.method
        );

        if (req.myChefs) {
            await Promise.all(
                req.myChefs.map(async (chefId) => {
                    const chef = await Chef.find({ _id: chefId });
                    const newChef = new chefData(chefId, chef[0].chefName, chef[0].chefImage, chef[0].chefBio, chef[0].dateSubmitted, chef[0].submittedBy, chef[0].familyName)
                    if (chef[0] && chef[0].chefRecipes) {
                        await Promise.all(
                            chef[0].chefRecipes.map(async (recipeId) => {
                                const recipe = await Recipe.find({ _id: recipeId });
                                newChef.chefRecipes.push(recipe[0]);
                            })
                        );
                        clientData.chefs.push(newChef);

                    }
                    else {
                        clientData.chefs.push(newChef);
                        return null;
                    }
                })
            );
            await Promise.all(
                req.myFamilies.map(async (familyId) => {
                    const family = await Family.find({ _id: familyId });
                    const newFamily = new familyData(family[0].familyName, family[0].familyOwnerName, family[0].chefId, family[0].familyMembers, family[0].chefName, family[0].dateSubmitted, family[0].submittedBy, family[0].familyBio)
                    clientData.families.push(newFamily);
                })
            );
            return clientData
        } else {
            return clientData
        }
    }
};