const express = require('express');
const authBLL = require('../BLL/authBLL');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, email } = req.body;
    try {
        const token = await authBLL.authenticateUser(username, email);
        res.json({ token })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
})

router.post('/logout', async (req, res) => {
    try{
        await authBLL.logoutUser();
        res.json({ message: 'User logged out successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router