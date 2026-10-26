import { Router } from 'express';
import { AuthController } from '../Controllers/AuthController';


const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', (request, response) => {
    authController.register(request, response);
});

authRoutes.post('/login', (request, response) => {
    authController.login(request, response);
})

export default authRoutes;