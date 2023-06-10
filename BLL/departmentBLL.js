const departmentDAL = require("../DAL/departmentDAL");
const employeeDAL = require("../DAL/employeeDAL");

// CRUD Functions
exports.getAllDepartments = async () => {
  return await departmentDAL.getAllDepartments();
};

exports.getDepartmentById = async (id) => {
  return await departmentDAL.getDepartmentById(id);
};

exports.createDepartment = async (department) => {
  return await departmentDAL.createDepartment(department);
};

exports.updateDepartment = async (id, department) => {
  return await departmentDAL.updateDepartment(id, department);
};

exports.deleteDepartment = async (id) => {
  await departmentDAL.deleteDepartment(id);
  return true;
};

// Other Functions
// Provides with ALL the departments' details together with their manager name and employees' names
exports.getAllDepartmentsWithDetails = async () => {
  const departments = await departmentDAL.getAllDepartments();
  const employeesByDepartment = await employeeDAL.getEmployeesByDepartmentId();
  const departmnetsWithDetails = departments.map((department) => {
    const employees = employeesByDepartment[department._id] || [];
    const managerName = department.managerID
      ? `${department.managerID.firstName} ${department.managerID.lastName}`
      : "";
    return {
      ...department.toObject(),
      managerName,
      employeeNames: employees.map((employee) => employee.fullName),
    };
  });
};

exports.deleteDepartmentWithEmployees = async (departmentId) => {
  await employeeDAL.deleteEmployees({ departmentID: departmentId });
  await departmentDAL.deleteDepartment(departmentId);
  return "Department and its employees deleted successfully!"
};
