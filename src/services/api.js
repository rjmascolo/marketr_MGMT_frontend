const API_ROOT = `http://localhost:3000/`;

const token = localStorage.getItem('token');

const login = (username, password) => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({username, password })
  }).then(res => res.json())
}

export default {
  auth: {
    login,
    getCurrentUser
  }
};
