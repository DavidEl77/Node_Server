const userDAL = require('../DAL/userDAL');
const authBLL = require('./authBLL');

exports.getAllUsers = async () => {
  return await userDAL.getAllUsers();
};

exports.getUserById = async (id) => {
  return await userDAL.getUserById(id);
};

exports.createUser = async (user) => {
  return await userDAL.createUser(user);
};

exports.updateUser = async (id, user) => {
  return await userDAL.updateUser(id, user);
};

exports.deleteUser = async (id) => {
  await userDAL.deleteUser(id);
  return true;
};

// Other Functions
// Provides the user's actions for the current day
exports.getUserActionsById = async (userId) => {
  const actions = await userDAL.getUserActions();
  const today = new Date().toLocaleDateString();
  return actions.filter(action => action.id === userId && action.date === today);
}

// logs the user's action for the current day, and blocks the user if he exceeded the actions limit
exports.logUserAction = async (userId) => {
  const today = new Date().toLocaleDateString();
  const actions = await userDAL.getUserActions();
  const userActions = actions.filter(action => action.id === userId && action.date === today);
  const user = await userDAL.getUserById(userId);
  const maxActions = user.numOfActions;
  if (userActions.length > maxActions) {
    await authBLL.logoutUser();
    throw new Error('User has exceeded the maximum actions allowed for today');
  }
  const newAction = { id: userId, maxActions, date: today, actionsAllowed: actionsAllowed - 1 };
  await userDAL.logUserAction(newAction)
}