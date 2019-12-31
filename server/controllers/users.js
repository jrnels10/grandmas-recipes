const JWT = require('jsonwebtoken');
const User = require('./../models/user');
const { uploadToGoogleCloud, deleteImageFromGoogleCloud } = require('./../cloud/googleCloud');
// import { uploadToGoogleCloud } from './../cloud/googleCloud';
const { JWT_secret } = process.env.NODE_ENV === "production" ? require('./../prodKeys') : require('./../config/keys');
// const { JWT_secret } = require('./../prodKeys');

const uuidv1 = require('uuid/v1');



signToken = user => {
    // console.log("user", user)
    return JWT.sign({
        iss: 'strava',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_secret);

}

module.exports = {
    signUp: async (req, res, next) => {
        // console.log(req.file)
        const { email, password, firstName, lastName, profilePicture } = req.value.body;
        // console.log(req.value.body)
        // Check if user has the same email
        const foundUser = await User.findOne({ 'local.email': email });
        // console.log('foundUser', foundUser)
        if (foundUser) {
            return res.status(403).send({ error: 'email is already in use' })
        }

        // Create new user
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                profilePicture: profilePicture
            }
        });
        await newUser.save();


        // response with token
        // res.json({ user: 'created' });
        const token = await signToken(newUser);

        res.status(200).json({ token: token });
    },
    signIn: async (req, res, next) => {
        console.log('sign in', req.user)
        //generate token
        const token = await signToken(req.user);
        res.status(200).json({ token });
    },

    googleOAuth: async (req, res, next) => {
        // Generate token
        // console.log(req.user)
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    facebookOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    secret: async (req, res, next) => {
        res.json({ secret: 'resource', profile: req.user })
    },
    getAll: async (req, res, next) => {
        return User.find().then(user => {
            var userMap = [];

            user.forEach(function (user, idx) {
                userMap.push({ userId: user._id, peaks: user.peaksCompleted });
            });

            res.send(userMap);
            return userMap
        });
    },
    getUsersById: async (req, res, next) => {
        return User.find({ '_id': { $in: req.body } }).then((users) => {
            var userMap = [];
            users.forEach((user) => {

                userMap.push({
                    userId: user._id,
                    firstName: user[user.method].firstName,
                    lastName: user[user.method].lastName,
                    profilePicture: user[user.method].profilePicture,
                    homeTown: user[user.method].homeTown,
                    homeState: user[user.method].homeState,
                    peaks: user.peaksCompleted
                });

            })
            console.log(userMap)
            res.send(userMap);
            return userMap
        }).catch(error => {
            res.send(404)
            return error

        });
    },
    uploadToGoogleCloud: async (req, res, next) => {
        const imageUploaded = await uploadToGoogleCloud(req.file);
        await res.send(imageUploaded);
        // await res.send(`https://storage.cloud.google.com/${imageUploaded[0].metadata.bucket}/${imageUploaded[0].metadata.name}`);
    },
    deleteFromGoogleCloud: async (req, res, next) => {
        const imageDeleted = await deleteImageFromGoogleCloud(req.params.fileName);
        console.log(imageDeleted)
        // await res.send(imageUploaded);
        // await res.send(`https://storage.cloud.google.com/${imageUploaded[0].metadata.bucket}/${imageUploaded[0].metadata.name}`);
    },
    addMyRecipe: async (req, res, next) => {
        let mine = req.body.myRecipes;
        let picture;
        const accountType = req.body.accountType === "google" ? 'google.email' :
            req.body.accountType === "facebook" ? 'facebook.email' : 'local.email';
        const foundMyRecipeList = await User.findOne({ [accountType]: req.params.email })
        if (req.file !== undefined) {
            const imageUploaded = await uploadToGoogleCloud(req.file);
            picture = `https://storage.cloud.google.com/${imageUploaded[0].metadata.bucket}/${imageUploaded[0].metadata.name}`;
            console.log(picture)
        }

        let myRecipes = foundMyRecipeList.myRecipes;
        myRecipes.push(Object.assign(JSON.parse(mine), { img: picture, private: true }));
        return await User.findOneAndUpdate({ [accountType]: req.params.email }, {
            "myRecipes": myRecipes
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
            const imageUploaded = await uploadToGoogleCloud(req.file);
            picture = `https://storage.cloud.google.com/${imageUploaded[0].metadata.bucket}/${imageUploaded[0].metadata.name}`;
            console.log(picture)

        }
        const buildUpdateObject = {};
        for (var key in changeRequest) {
            key == 'recipeName' ? Object.assign(buildUpdateObject, { 'myRecipes.$.recipeName': changeRequest[key] }) :
                key == 'groups' ? Object.assign(buildUpdateObject, { 'myRecipes.$.groups': changeRequest[key] }) :
                    key == 'chefName' ? Object.assign(buildUpdateObject, { 'myRecipes.$.chefName': changeRequest[key] }) :
                        key == 'chefBio' ? Object.assign(buildUpdateObject, { 'myRecipes.$.chefBio': changeRequest[key] }) :
                            key == 'cookingInstructions' ? Object.assign(buildUpdateObject, { 'myRecipes.$.cookingInstructions': changeRequest[key] }) :
                                key == 'img' ? Object.assign(buildUpdateObject, { 'myRecipes.$.img': picture }) :
                                    key == 'chefImage' ? Object.assign(buildUpdateObject, { 'myRecipes.$.chefimage': chefImage }) :
                                        key == 'private' ? Object.assign(buildUpdateObject, { 'myRecipes.$.private': changeRequest[key] }) :
                                            key == 'ingredients' ? Object.assign(buildUpdateObject, { 'myRecipes.$.ingredients': changeRequest[key] }) : null

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
    },
    connection: async (req, res, next) => {
        res.status(200).json({ connection: 'connection to backend successful!' })
    },
    updateUser: async (req, res, next) => {
        var obj = JSON.parse(req.body.user);
        console.log(obj)
        var picture;
        if (req.file === undefined) {
            const imageUploaded = await uploadToGoogleCloud(req.file);
            `https://storage.cloud.google.com/${imageUploaded[0].metadata.bucket}/${imageUploaded[0].metadata.name}`
        }
        else {
            picture = req.file.originalname;
        }
        // console.log("Test", obj.methodType)
        if (req.body.data === "google") {
            const googleObject = {
                "google.profilePicture": picture,
                "google.email": obj.email,
                "google.firstName": obj.firstName,
                "google.lastName": obj.lastName,
                "google.homeTown": obj.homeTown,
                "google.homeState": obj.homeState
            }
            // console.log("homeTown",obj.homeTown)
            return User.findOneAndUpdate({ 'google.email': req.params.email }, googleObject).then(function () {
                console.log("updated")
                User.findOne({ 'google.email': req.params.email }).then(function (item) {
                    res.send(item)
                });
            });
        }
        // else if (req.body.data === "local") {
        //     const localObject = {
        //         "local.profilePicture": picture,
        //         "local.email": obj.email,
        //         "local.firstName": obj.firstName,
        //         "local.lastName": obj.lastName,
        //         "local.homeTown": obj.homeTown,
        //         "local.homeState": obj.homeState
        //     }
        //     console.log("local", localObject)

        //     return User.findOneAndUpdate({ 'local.email': req.params.email }, localObject).then(function () {
        //         console.log("updated")
        //         User.findOne({ 'local.email': req.params.email }).then(function (item) {
        //             res.send(item)
        //         });
        //     });
        // }
        // else if (req.body.data === "facebook") {
        //     const facebookObject = {
        //         "facebook.profilePicture": picture,
        //         "facebook.email": obj.email,
        //         "facebook.firstName": obj.firstName,
        //         "facebook.lastName": obj.lastName,
        //         "facebook.homeTown": obj.homeTown,
        //         "facebook.homeState": obj.homeState
        //     }
        //     return User.findOneAndUpdate({ 'facebook.email': req.params.email }, facebookObject).then(function () {
        //         console.log("updated")
        //         User.findOne({ 'facebook.email': req.params.email }).then(function (item) {
        //             res.send(item)
        //         });
        //     });
        // }
    }
}