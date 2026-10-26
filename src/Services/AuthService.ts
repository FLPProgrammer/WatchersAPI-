import bcrypt from 'bcrypt';

import { prisma } from '../Database/Prisma';

import { 
    RegisterInput,
    LoginInput,
} from '../Schemas/AuthSchemas';


export class AuthService {
    async register(data: RegisterInput) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (existingUser) {
            throw new Error('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        return user;
    }

    async login(data: LoginInput) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const passwordMatches = await bcrypt.compare(
            data.password,
            user.password,
        );

        if (!passwordMatches) {
            throw new Error('Invalid email or password!')
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}