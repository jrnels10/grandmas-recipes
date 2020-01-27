const JWT = require('jsonwebtoken');
const User = require('./../models/user');
const { uploadToGoogleCloud, deleteImageFromGoogleCloud } = require('./../cloud/googleCloud');
// import { uploadToGoogleCloud } from './../cloud/googleCloud';
const { JWT_secret } = process.env.NODE_ENV === "production" ? require('./../prodKeys') : require('./../config/keys');
// const { JWT_secret } = require('./../prodKeys');

const uuidv1 = require('uuid/v1');



signToken = user => {
    console.log("user", user)
    return JWT.sign({
        iss: 'strava',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_secret);

}

module.exports = {
    signUp: async (req, res, next) => {
        console.log('====================signUp controller====================')
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
                profilePicture: "default"
            }
        });
        await newUser.save();


        // response with token
        // res.json({ user: 'created' });
        const token = await signToken(newUser);

        res.status(200).json({ token: token });
        console.log('====================signUp controller completed====================')

    },
    signIn: async (req, res, next) => {
        console.log('====================signIn controller====================')

        //generate token
        const token = await signToken(req.user);
        res.status(200).json({ token });
        console.log('====================signIn controller completed====================')

    },

    googleOAuth: async (req, res, next) => {
        // Generate token
        try {

            console.log(req.user)
            const token = signToken(req.user);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json(error)
        }
    },
    facebookOAuth: async (req, res, next) => {
        try {

            const token = signToken(req.user);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json(error)
        }
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
                ;
                userMap.push({
                    userId: user._id,
                    firstName: user[user.method].firstName,
                    lastName: user[user.method].lastName,
                    profilePicture: user[user.method].profilePicture,
                    homeTown: user[user.method].homeTown,
                    homeState: user[user.method].homeState
                });

            });
            res.send(userMap);
            return userMap
        }).catch(error => {
            res.send(404)
            return error

        });
    }
}