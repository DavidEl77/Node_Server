const axios = require('axios');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../authMiddleware')

exports.getUserByUsername = async (username) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`);
    return response.data[0];
};

exports.getUserByEmail = async (email)  => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}`);
    return response.data[0];
};

exports.createUserToken = (user) => {
    const payload = { id: user.id, username: user.username, email: user.email, name: user.name };
    const token = jwt.sign(payload, SECRET_KEY);
    return token
};

exports.clearUserToken = () => {
    localStorage.removeItem('jwtToken');
};