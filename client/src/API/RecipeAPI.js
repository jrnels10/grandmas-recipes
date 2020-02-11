import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com';

export async function secret() {
    return await axios.get(`${baseUrl}/users/secret`);
};





// ==================== RECIPE API ===========================
//============================================================

export function addNewRecipe(bodyFormData, email) {
    try {
        return axios.put(`${baseUrl}/recipes/addmyrecipe/${email}`,
            bodyFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (error) {
        return console.log(error)
    }
};


export function getmyrecipe(recipeId) {
    try {
        return axios.post(`${baseUrl}/recipes/getmyrecipe/${recipeId}`)
    } catch (error) {
        return 'Could not find recipe!'
    }
};

