const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            dropDups: true
        },
        password: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        homeTown: {
            type: String,
        },
        homeState: {
            type: String,
        },
        profilePicture: {
            type: String,
            required: false
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        homeTown: {
            type: String,
        },
        homeState: {
            type: String,
        },
        profilePicture: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        homeTown: {
            type: String,
        },
        homeState: {
            type: String,
        },
        profilePicture: {
            type: String
        }
    },
    myRecipes: [{
        chefImage: {
            type: String
        },
        chefName: {
            type: String
        },
        dateSubmitted: {
            type: Date
        },
        chefBio: {
            type: String
        },
        submittedBy: {
            type: String
        },
        familyName: {
            type: String
        },
        chefRecipes: [{
            recipeName: {
                type: String
            },
            dateSubmitted: {
                type: Date
            },
            recipeDescription: {
                type: String
            },
            submittedBy: {
                type: String
            },
            img: {
                type: String
            },
            ingredients: [{
                ingredient: {
                    type: String
                },
                amount: {
                    type: Number
                },
                units: {
                    type: String
                }
            }],
            cookingInstructions: {
                type: String
            },
            private: Boolean
        }]
    }],
    myFamilies: [{
        familyName: {
            type: String
        },
        founder: {
            type: String
        },
        familyChefs: [{
            chefName: {
                type: String
            },
            chefId: {
                type: String
            }
        }],
        familyMembers: [{
            memberName: {
                type: String
            },
            memberId: {
                type: String
            }
        }]
    }]
    // index: { unique: true }
});

// userSchema.plugin(uniqueValidator)
userSchema.pre('save', async function (next) {
    try {
        if (this.method !== 'local') {
            next();
        }
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHashed;
        next();
    } catch (error) {
        next(error)
    }
});
userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('user', userSchema);
module.exports = User;