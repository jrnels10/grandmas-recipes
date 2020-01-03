import axios from 'axios';

export async function secret() {
  return await axios.get(`http://localhost:5000/users/secret`);
}
