import { secret } from './../../API/RecipeAPI';

export default async (dispatch, userState) => {
    try {
        const res = await secret();
        const userType = res.data.profile;
        return userState.setState({
            _id: userType._id,
            email: userType[userType.method].email,
            firstName: userType[userType.method].firstName,
            lastName: userType[userType.method].lastName,
            profilePicture: userType[userType.method].profilePicture,
            homeTown: userType[userType.method].homeTown,
            homeState: userType[userType.method].homeState,
            method: userType.method,
        }, () => {
            dispatch({
                type: "USER_INFO",
                payload: {
                    _id: userType._id,
                    email: userType[userType.method].email,
                    firstName: userType[userType.method].firstName,
                    lastName: userType[userType.method].lastName,
                    profilePicture: userType[userType.method].profilePicture,
                    homeTown: userType[userType.method].homeTown,
                    homeState: userType[userType.method].homeState,
                    myRecipes: userType.myRecipes,
                    myFamilies: userType.myFamilies,
                    method: userType.method,
                }
            });
        });
    } catch (err) {
        console.log(err)
    }
};
