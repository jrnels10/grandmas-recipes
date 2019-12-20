import axios from 'axios';

export async function secret() {
  return await axios.get(`http://localhost:5000/users/secret`);
}

// export async function getUsersById(arr) {
//   const userArray = arr.map(element => ({ _id: element.userId }))
//   console.log(userArray)
//   return await axios.post(`https://fourteener-community.herokuapp.com/users/getUsersById`, userArray);
// }