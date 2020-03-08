import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com';

export async function secret() {
    return await axios.get(`${baseUrl}/users/secret`);
};


// ==================== RECIPE API ===========================
//============================================================

export async function addNewRecipe(bodyFormData, id) {
    try {
        return axios.post(`${baseUrl}/recipes/addmyrecipe/${id}`,
            bodyFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } }).catch(function (error) {
                return error.response.data
            })
    } catch (error) {
        return console.log(error)
    }
};

export async function updateRecipe(bodyFormData, id) {
    try {
        return axios.put(`${baseUrl}/recipes/updatemyrecipe/${id}`,
            bodyFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } }).catch(function (error) {
                return error.response.data
            })
    } catch (error) {
        return console.log(error)
    }
};


export async function getmyrecipe(recipeId) {
    try {
        return axios.post(`${baseUrl}/recipes/getmyrecipe/${recipeId}`)
    } catch (error) {
        return 'Could not find recipe!'
    }
};

