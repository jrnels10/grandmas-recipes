import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com';

// ==================== CHEF API ===========================
//==========================================================
export function findMyChef(chefId) {
    try {
        return axios.post(`${baseUrl}/chefs/findmychef/${chefId}`)
    } catch (error) {
        return 'Could not find recipe!'
    };
};

export function addNewChef(bodyFormData, id) {
    debugger
    try {
        if (id !== '') {

            return axios.post(`${baseUrl}/chefs/addmychef/${id}`,
                bodyFormData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
        } else {
            return 'no user was found';
        }
    } catch (error) {
        return 'recipe was not saved!'
    };
};