import express from "express";
import authRouter from './routes/auth.route'
import { connectDB } from "./config/db"; 


const app = express();
app.use(express.json());

connectDB();
app.use('/api/v1/authentication', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running in port : ' + PORT);
});