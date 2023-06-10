const employeeDAL = require('../DAL/employeeDAL');
const shiftDAL = require('../DAL/shiftDAL');
const departmentDAL = require('../DAL/departmentDAL');

// CRUD Functions
exports.getAllEmployees = async () => {
  return await employeeDAL.getAllEmployees();
};

exports.getEmployeeById = async (id) => {
  return await employeeDAL.getEmployeeById(id);
};

exports.createEmployee = async (employee) => {
  return await employeeDAL.createEmployee(employee);
};

exports.updateEmployee = async (id, employee) => {
  return await employeeDAL.updateEmployee(id, employee);
};

exports.deleteEmployee = async (id) => {
  await employeeDAL.deleteEmployee(id);
  return true;
};

// Other functions
exports.getEmployeesByDepartmentId = async (departmentId) => {
  return await employeeDAL.getEmployeesByDepartmentId(departmentId);
};

// Provides with ALL the employees' details together with their department name and shifts
exports.getAllEmployeesWithDetails = async () => {
  const employees = await employeeDAL.getEmploycpemeesByDepartmentIdWithShifts();
  return employees;
}

// Provides with the SINGLE employee's details together with their department name and shifts
exports.getEmployeeByIdWithDetails = async (id) => {
  const employee = await employeeDAL.getEmployeeById(id);
  const department = await departmentDAL.getDepartmentById(employee.departmentID);
  const shifts = await shiftDAL.getShiftsByEmployeeId(employee._id);
  return {
    ...employee.toObject(),
    departmentName: department.name,
    shifts
  }
};

exports.deleteEmployeeWithDetails = async (id) => {
  await employeeDAL.deleteEmployee(id);
  await shiftDAL.removeEmployeeFromShifts(id);
  return 'Deleted employee and removed them from all their shifts'
};

// Displays all the employees that are not in the department for the dropdown menu
exports.getEmployeesNotInDepartmnet = async (departmentId) => {
  const employees = await employeeDAL.getEmployeesNotInDepartment(departmentId);
  return employees;
};

// Updates the department of the employee from the dropdown menu
exports.updateEmployeeDepartment = async (departmentId, employeeId) => {
  return await employeeDAL.updateEmployee({ _id: employeeId }, { departmentID: departmentId });
};
