import { secret } from './../../API/RecipeAPI';

export default async (dispatch, userState) => {
    try {
        const res = await secret();
        const userType = res.data.profile;
        console.log(userType)
        return userState.setState({
            _id: userType.user._id,
            email: userType.user[userType.method].email,
            firstName: userType.user[userType.method].firstName,
            lastName: userType.user[userType.method].lastName,
            profilePicture: userType.user[userType.method].profilePicture,
            homeTown: userType.user[userType.method].homeTown,
            homeState: userType.user[userType.method].homeState,
            method: userType.method,
        }, () => {
            dispatch({
                type: "USER_INFO",
                payload: {
                    _id: userType.user._id,
                    email: userType.user[userType.method].email,
                    firstName: userType.user[userType.method].firstName,
                    lastName: userType.user[userType.method].lastName,
                    profilePicture: userType.user[userType.method].profilePicture,
                    homeTown: userType.user[userType.method].homeTown,
                    homeState: userType.user[userType.method].homeState,
                    myChefs: userType.chefs,
                    myRecipes: userType.recipes,
                    myFamilies: userType.myFamilies,
                    method: userType.method,
                }
            });
        });
    } catch (err) {
        console.log(err)
    }
};
