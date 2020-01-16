import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com';


export function addNewRecipe(bodyFormData, email) {
    try {
        return axios.put(`${baseUrl}/users/addmyrecipe/${email}`,
            bodyFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (error) {
        return console.log(error)
    }
}

export function addNewChef(bodyFormData, email) {
    try {
        return axios.put(`${baseUrl}/users/addmygrandma/${email}`,
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

export function findMyChef(chefId) {
    try {
        return axios.post(`${baseUrl}/users/findmychef/${chefId}`)
    } catch (error) {
        return 'Could not find recipe!'
    }
}