import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://familyrecipes-app.herokuapp.com';




export async function secret() {
    return await axios.get(`${baseUrl}/users/secret`);
};



// ==================== CHEF API ===========================
//==========================================================
export async function findMyUser(userId) {
    try {
        return axios.post(`${baseUrl}/users/findmyuser/${userId}`);
    }
    catch (error) {
        return error.response.data;
    }
};

// export function addNewChef(bodyFormData, id) {
//     if (id !== '') {
//         return axios.post(`${baseUrl}/chefs/addmychef/${id}`,
//             bodyFormData,
//             { headers: { 'Content-Type': 'multipart/form-data' } }).catch(function (error) {
//                 return error.response.data
//             })
//     } else {
//         return 'no user was found';
//     }
// };

// export function updateMyChef(bodyFormData, id) {
//     if (id !== '') {
//         return axios.put(`${baseUrl}/chefs/updatemychef/${id}`,
//             bodyFormData,
//             { headers: { 'Content-Type': 'multipart/form-data' } }).catch(function (error) {
//                 return error.response.data
//             })
//     } else {
//         return 'no user was found';
//     }
// };


// export function deleteMyChef(chefId, id) {
//     if (id !== '') {
//         return axios.delete(`${baseUrl}/chefs/deletemychef/${id}`, { data: { chefId } })
//             .catch(function (error) {
//                 return error.response.data
//             })
//     } else {
//         return 'no user was found';
//     }
// };