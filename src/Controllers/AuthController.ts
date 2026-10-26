import { Request, Response } from 'express';
import { z } from 'zod';

import { AuthService } from '../Services/AuthService';
import { TokenService } from '../Services/TokenService';
import { 
    RegisterSchema,
    LoginSchema,
} from '../Schemas/AuthSchemas';


const tokenService = new TokenService();
const authService = new AuthService();


export class AuthController {
    async register(request: Request, response: Response) {
        try {
            const data = RegisterSchema.parse(request.body);

            const user = await authService.register(data);
            const accessToken = tokenService.generateAccessToken(user.id);

            return response.status(201).json({
                message: 'User registered successfully!',
                user,
                accessToken,
            });
        } catch(error) {
            if(error instanceof z.ZodError) {
                return response.status(400).json({
                    message: 'Validation error',
                    errors: error.issues,
                });
            }

            if(
                error instanceof Error &&
                error.message === 'Email already registered'
            ) {
                return response.status(409).json({
                    message: error.message,
                });
            }
            console.error(error);

            return response.status(500).json({
                message: 'Internal server error',
            });
        }
    }


    async login(request: Request, response: Response) {
        try {
            const data = LoginSchema.parse(request.body);

            const user = await authService.login(data);

            
        return response.status(200).json({
            message: 'Login successful',
            user,
        });
      } catch(error) {
        if(error instanceof z.ZodError) {
            return response.status(400).json({
                message: 'Validation Error',
                errors: error.issues,
            });
        }

        if(
            error instanceof Error && 
            error.message === "Invalid email or password"
        ) {
            return response.status(401).json({
                message: 'Invalid email or password',
            });
        }

        console.error(error);

        return response.status(500).json({
            message: 'Internal server error',
        })
      }
    }

}

