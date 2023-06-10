const authDAL = require('../DAL/authDAL');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mySecretKey';

exports.authenticateUser = (username, email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userByUsername = await authDAL.getUserByUsername(username);
            const userByEmail = await authDAL.getUserByEmail(email);
            if (userByUsername && userByEmail && userByUsername.id === userByEmail.id) {
                const token = authDAL.createUserToken(userByUsername);
                resolve(token);
            } else {
                reject(new Error('Authentication failed: Invalid username or email'));
            }
        } catch (error) {
            reject(error);
        }
    });
}

exports.logoutUser = () => {
    return new Promise((resolve, reject) => {
        try {
            authDAL.clearUserToken();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};