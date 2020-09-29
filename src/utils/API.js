import axios from 'axios';

const api = 'https://api.github.com';
const username = process.env.GIT_USER;
const password = process.env.GIT_PWD;

export const fetchUser = (user) => {
  return axios.get(`${api}/users/${user}`, {
    auth: {
      username: username,
      password: password
    }
  })
  .then(res => res.data)
  .catch(err => err)
}

export const fetchStarred = (user) => {
  return axios.get(`${api}/users/${user}/starred`, {
    auth: {
      'username': username,
      'password': password
    },
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    },
    params: {
      per_page: 100
    }
  })
  .then(res => res.data)
  .catch(err => err)
}
