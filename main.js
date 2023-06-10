const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const departmentRouter = require('./routers/departmentRouter');
const employeeRouter = require('./routers/employeeRouter');
const shiftRouter = require('./routers/shiftRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());

// routers
app.use('/departments', departmentRouter);
app.use('/employees', employeeRouter);
app.use('/shifts', shiftRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter)


app.listen(
  port,
  () => console.log(`app is listening at http://localhost:${port}`)
);