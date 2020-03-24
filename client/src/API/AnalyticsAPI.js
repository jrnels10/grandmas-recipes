import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com';

// ==================== CHEF API ===========================
//==========================================================
export async function getDataByDayWithinDates(params) {
    try {
        return axios.post(`${baseUrl}/analytics/getDataByDayWithinDates`, params);
    }
    catch (error) {
        return error.response.data;
    }
};

export async function getDateByWeekWithinDates(params) {
    try {
        return axios.post(`${baseUrl}/analytics/getDataByWeekWithinDates`, params);
    }
    catch (error) {
        return error.response.data;
    }
};

export async function getlastLoginDataByDayWithinDates(params) {
    try {
        return axios.post(`${baseUrl}/analytics/getlastLoginDataByDayWithinDates`, params);
    }
    catch (error) {
        return error.response.data;
    }
};