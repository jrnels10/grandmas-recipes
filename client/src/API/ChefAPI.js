import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com';

// ==================== CHEF API ===========================
//==========================================================
export async function findMyChef(chefId) {
    try {
        return axios.post(`${baseUrl}/chefs/findmychef/${chefId}`);
    }
    catch (error) {
        return error.response.data;
    }
};

export function addNewChef(bodyFormData, id) {
    if (id !== '') {
        return axios.post(`${baseUrl}/chefs/addmychef/${id}`,
            bodyFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } }).catch(function (error) {
                return error.response.data
            })
    } else {
        return 'no user was found';
    }
};

export function updateMyChef(bodyFormData, id) {
    if (id !== '') {
        return axios.put(`${baseUrl}/chefs/updatemychef/${id}`,
            bodyFormData,
            { headers: { 'Content-Type': 'multipart/form-data' } }).catch(function (error) {
                return error.response.data
            })
    } else {
        return 'no user was found';
    }
};


export function deleteMyChef(chefId, id) {
    if (id !== '') {
        return axios.delete(`${baseUrl}/chefs/deletemychef/${id}`, { data: { chefId } })
            .catch(function (error) {
                return error.response.data
            })
    } else {
        return 'no user was found';
    }
};