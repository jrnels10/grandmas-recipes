import axios from 'axios';
const baseUrl = 'http://localhost:5000'
export function addNewRecipe(bodyFormData, email) {
    try {
        return axios.put(`${baseUrl}/users/addmyrecipe/${email}`,
            bodyFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (error) {
        return 'recipe was not saved!'
    }
}

export function getmyrecipe(recipeId) {
    try {
        return axios.post(`${baseUrl}/users/getmyrecipe/${recipeId}`)
    } catch (error) {
        return 'Could not find recipe!'
    }
}