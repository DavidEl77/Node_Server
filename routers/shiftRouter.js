const express = require('express');
const shiftBLL = require('../BLL/shiftBLL');
const { validateToken } = require('../authMiddleware');

const router = express.Router();

router.use(validateToken);

router.get('/', async (req, res) => {
  const shifts = await shiftBLL.getAllShifts();
  res.json(shifts);
});

router.get('/:id', async (req, res) => {
  const shift = await shiftBLL.getShiftById(req.params.id);
  res.json(shift);
});

router.post('/', async (req, res) => {
  const newShift = await shiftBLL.createShift(req.body);
  res.json(newShift);
});

router.put('/:id', async (req, res) => {
  const updatedShift = await shiftBLL.updateShift(req.params.id, req.body);
  res.json(updatedShift);
});

router.delete('/:id', async (req, res) => {
  await shiftBLL.deleteShift(req.params.id);
  res.sendStatus(204);
});

// Other Functions
router.get('/employee/:employeeId', async (req, res) => {
  const shifts = await shiftBLL.getShiftsbyEmployeeId(req.params.employeeId);
  res.json(shifts);
});

router.put('/:id/employees', async (req, res) => {
  const shiftId = req.params.id;
  const employeeIds = req.body.employeeIds;
  await shiftBLL.allocateEmployeesToShift(shiftId, employeeIds);
  res.sendStatus(204);
});

module.exports = router;