import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com';

// ==================== Family API ===========================
//==========================================================
export async function createFamily(userId, data) {
    try {
        return axios.post(`${baseUrl}/families/createmyfamily/${userId}`,
            data,
            { headers: { 'Content-Type': 'multipart/form-data' } }).catch(function (error) {
                return error.response.data
            });
    }
    catch (error) {
        return error.response.data;
    }
};

export async function addNewfamilyMember(userId, body) {
    try {
        return axios.post(`${baseUrl}/families/createmyfamily/${userId}`, body)
    }
    catch (error) {
        return error.response.data;
    }
}