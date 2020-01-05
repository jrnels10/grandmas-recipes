import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://grandmasrecipes.herokuapp.com';

export async function secret() {
  return await axios.get(`${baseUrl}/users/secret`);
}
