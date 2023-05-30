import {authenticateToken, generateToken} from "../services/authMiddleware";
import {encryptPass, isValidPass} from "../services/Cryto";
import express, {Request, Response} from 'express';
import {PrismaClient} from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient()
router.post("/sing-in", authenticateToken, async (req: Request, res: Response) => {
    const {username, password} = req.body
    const isUserNameUsed = await prisma.users.findFirst({
        where: {
            username
        }
    })
    if (isUserNameUsed) return res.status(200).send({error: "username already used"})
    const user = await prisma.users.create({
        data: {
            username,
            password: encryptPass(password)
        }
    })
    const token = generateToken(user)
    return res.status(200).send({username, token})
});
router.post("/log-in", async (req: Request, res: Response) => {
    const {username, password} = req.body
    const user = await prisma.users.findFirst({
        where: {
            username
        }
    })
    if (!isValidPass(password, user.password))
        return res.status(400).send({error: "password is invalid"})
    const token = generateToken(user)
    return res.status(200).send({username, token})
});

export default router