import express, { Express, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/users", async(req: Request, res: Response) => {
  const users = await prisma.users.findMany()
  res.send(users);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Esta at http://localhost:${port}`);
});
