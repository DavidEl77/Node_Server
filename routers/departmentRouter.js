const express = require('express');
const departmentBLL = require('../BLL/departmentBLL');
const { validateToken } = require('../authMiddleware');

const router = express.Router();

router.use(validateToken);

router.get('/', async (req, res) => {
  const departments = await departmentBLL.getAllDepartments();
  res.json(departments);
});

router.get('/:id', async (req, res) => {
  const department = await departmentBLL.getDepartmentById(req.params.id);
  res.json(department);
});

router.post('/', async (req, res) => {
  const newDepartment = await departmentBLL.createDepartment(req.body);
  res.json(newDepartment);
});

router.put('/:id', async (req, res) => {
  const updatedDepartment = await departmentBLL.updateDepartment(req.params.id, req.body);
  res.json(updatedDepartment);
});

router.delete('/:id', async (req, res) => {
  await departmentBLL.deleteDepartment(req.params.id);
  res.sendStatus(204);
});

// Other Functions
router.get('/details', async (req, res) => {
  const departmentsWithDetails = await departmentBLL.getAllDepartmentsWithDetails();
  res.json(departmentsWithDetails);
});

router.delete('/:id/employees', async (req, res) => {
  await departmentBLL.deleteDepartmentWithEmployees(req.params.id);
  res.sendStatus(204);
});

module.exports = router;