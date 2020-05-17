const joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            // console.log("validate",req.body)
            const result = joi.validate(req.body, schema);
            console.log("result", result)
            if (result.error) {
                return res.status(400).send({ error: result.error });
            }
            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    validateMyChef: (schema) => {
        return (req, res, next) => {
            // console.log("validate",req.body)
            const result = joi.validate(req.body.myChef, schema);
            console.log("result", result)
            if (result.error) {
                return res.status(400).send({ error: result.error });
            }
            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    validateMyRecipe: (schema) => {
        return (req, res, next) => {
            // console.log("validate",req.body)
            const result = joi.validate(req.body.myRecipes, schema);
            console.log("result", result)
            if (result.error) {
                return res.status(400).send({ error: result.error });
            }
            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    schema: {
        authSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
            firstName: joi.string(),
            lastName: joi.string(),
            homeTown: joi.string(),
            homeState: joi.string(),
            profilePicture: joi.string()
        }),
        chefSchema: joi.object().keys({
            chefName: joi.string().required(),
            submittedBy: joi.string().required(),
            dateSubmitted: joi.date().required(),
            familyName: joi.string(),
            chefBio: joi.string()
        }),
        updatedChefSchema: joi.object().keys({
            chefId: joi.string().required(),
            chefName: joi.string().required(),
            updatedBy: joi.string().required(),
            dateUpdated: joi.date().required(),
            familyName: joi.string(),
            chefBio: joi.string()
        }),
        recipeSchema: joi.object().keys({
            recipeName: joi.string(),
            chefId: joi.string().required(),
            submittedBy: joi.string().required(),
            dateSubmitted: joi.date().required(),
            recipeOwnerId: joi.string().required(),
            recipeImage: joi.string(),
            cookingInstructions: joi.string(),
            recipeDescription: joi.string(),
            groups: joi.array(),
            ingredients: joi.array()
        }),
    }
}
