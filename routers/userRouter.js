const express = require('express');
const userBLL = require('../BLL/userBLL');
const { validateToken } = require('../authMiddleware');

const router = express.Router();

router.use(validateToken);

router.get('/', async (req, res) => {
  const users = await userBLL.getAllUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await userBLL.getUserById(req.params.id);
  res.json(user);
});

router.post('/', async (req, res) => {
  const newUser = await userBLL.createUser(req.body);
  res.json(newUser);
});

router.put('/:id', async (req, res) => {
  const updatedUser = await userBLL.updateUser(req.params.id, req.body);
  res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
  await userBLL.deleteUser(req.params.id);
  res.sendStatus(204);
});

// Other Functions
router.get('/:id/actions', async (req, res) => {
  const actions = await userBLL.getUserActionsById(req.params.id);
  res.json(actions);
});

router.post('/:id/actions', async (req, res) => {
  try {
    await userBLL.logUserAction(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;