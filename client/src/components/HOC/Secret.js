import { secret } from './../../API/RecipeAPI';

export default async (dispatch, userState) => {
    try {
        const res = await secret();
        const userType = res.data.profile;
        return userState.setState({
            _id: userType.user._id,
            email: userType.email,
            firstName: userType.firstName,
            lastName: userType.lastName,
            profilePicture: userType.profilePicture,
            method: userType.method,
        }, () => {
            dispatch({
                type: "USER_INFO",
                payload: {
                    _id: userType.id,
                    email: userType.email,
                    firstName: userType.firstName,
                    lastName: userType.lastName,
                    profilePicture: userType.profilePicture,
                    chefs: userType.chefs,
                    method: userType.method,
                }
            });
        });
    } catch (err) {
        console.log(err)
    }
};
