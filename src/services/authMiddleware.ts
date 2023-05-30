import {NextFunction, Request, Response} from 'express';
import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader: string | undefined = req.headers.authorization;
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.sendStatus(401); // Unauthorized
        return;
    }

    jwt.verify(token, jwtSecret, (err) => {
        if (err) {
            res.sendStatus(403); // Forbidden
            return;
        }
        next();
    });
}

export const generateToken = (user) => {
    return jwt.sign(user, jwtSecret, {expiresIn: '1h'});
}
