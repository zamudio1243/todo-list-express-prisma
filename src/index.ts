import express, { Express, Request, Response } from "express";
import { authenticateToken } from "./services/authMiddleware";
import AuthRoute from "./routes/AuthRoute";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(AuthRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/protected", authenticateToken, (req, res) => {
  return res.json({ message: "you have authorization" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Esta at http://localhost:${port}`);
});
