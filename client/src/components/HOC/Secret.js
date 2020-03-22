import { secret } from './../../API/UserAPI';

export default async (dispatch, userState) => {
    try {
        const res = await secret();
        const userType = res.data.profile;
        return userState.setState({
            id: userType.id,
            email: userType.email,
            firstName: userType.firstName,
            lastName: userType.lastName,
            profilePicture: userType.profilePicture,
            method: userType.method,
            chefs: userType.chefs,
            recipesLiked: userType.recipesLiked,
            families: userType.families
        }, () => {
            dispatch({
                type: "USER_INFO",
                payload: {
                    id: userType.id,
                    email: userType.email,
                    firstName: userType.firstName,
                    lastName: userType.lastName,
                    profilePicture: userType.profilePicture,
                    chefs: userType.chefs,
                    method: userType.method,
                    recipesLiked: userType.recipesLiked,
                    families: userType.families

                }
            });
        });
    } catch (err) {
        console.log(err)
    }
};
