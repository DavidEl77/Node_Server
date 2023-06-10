const express = require('express');
const employeeBLL = require('../BLL/employeeBLL');
const { validateToken } = require('../authMiddleware');


const router = express.Router();

router.use(validateToken);

router.get('/', async (req, res) => {
  const employees = await employeeBLL.getAllEmployees();
  res.json(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await employeeBLL.getEmployeeById(req.params.id);
  res.json(employee);
});

router.post('/', async (req, res) => {
  const newEmployee = await employeeBLL.createEmployee(req.body);
  res.json(newEmployee);
});

router.put('/:id', async (req, res) => {
  const updatedEmployee = await employeeBLL.updateEmployee(req.params.id, req.body);
  res.json(updatedEmployee);
});

router.delete('/:id', async (req, res) => {
  await employeeBLL.deleteEmployee(req.params.id);
  res.sendStatus(204);
});

// Other Functions
router.get('/department/:departmentId', async (req, res) => {
  const employees = await employeeBLL.getEmployeesByDepartmentId(req.params.departmentId);
  res.json(employees);
});

router.get('/details', async (req, res) => {
  const employeesWithDetails = await employeeBLL.getAllEmployeesWithDetails();
  res.json(employeesWithDetails);
});

// fetch (http://localhost:8000/dsafadsfijnasfd/details)
router.get('/:id/details', async (req, res) => {
  const employeeWithDetails = await employeeBLL.getEmployeeByIdWithDetails(req.params.id);
  res.json(employeeWithDetails);
});

router.delete('/:id/details', async (req, res) => {
  await employeeBLL.deleteEmployeeWithDetails(req.params.id);
  res.sendStatus(204);
});

router.get('/not-in-department/:departmentId', async (req, res) => {
  const employees = await employeeBLL.getEmployeesNotInDepartmnet(req.params.departmentId);
  res.json(employees);
});

router.put('/:id/department/:departmentId', async (req, res) => {
  await employeeBLL.updateEmployeeDepartment(req.params.departmentId, req.params.id);
  res.sendStatus(204);
});

module.exports = router;