const shiftDAL = require('../DAL/shiftDAL');

// CRUD Functions
exports.getAllShifts = async () => {
  return await shiftDAL.getAllShifts();
};

exports.getShiftById = async (id) => {
  return await shiftDAL.getShiftById(id);
};

exports.createShift = async (shift) => {
  return await shiftDAL.createShift(shift); 
};

exports.updateShift = async (id, shift) => {
  return await shiftDAL.updateShift(id, shift); 
};

exports.deleteShift = async (id) => {
  await shiftDAL.deleteShift(id);
  return true;
};

// Other Functions -
exports.getShiftsbyEmployeeId = async (employeeId) => {
  return await shiftDAL.getShiftsByEmployeeId(employeeId);
};

exports.allocateEmployeesToShift = async (shiftId, employeeIds) => {
  return await shiftDAL.allocateEmployeesToShift(shiftId, employeeIds); 
};