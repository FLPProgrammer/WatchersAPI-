import { Router } from 'express';
import { AuthController } from '../Controllers/AuthController';
import { authenticate } from '../Middlewares/Autheticate';


const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', (request, response) => {
    authController.register(request, response);
});

authRoutes.post('/login', (request, response) => {
    authController.login(request, response);
})

authRoutes.get('/me', authenticate, (request, response) => {
    authController.me(request, response);
})

authRoutes.post('/logout', (request, response) => {
    authController.logout(request, response);
});

export default authRoutes;