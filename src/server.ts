import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';

import authRoutes from './Routes/AuthRoutes';

const app = express();
const PORT = 3001;

app.use(cookieParser())
app.use(helmet())   

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (request, response) =>  {
    response.status(200).json({
        status: 'ok',
        message: 'Watchers is running!'
    });
});

app.listen(PORT, () =>  {
    console.log(`Watchers API is running at http:/localhost:${PORT}`);
})