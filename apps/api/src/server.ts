import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import { authRouter } from "@/routes/index.js";
import passport from "passport";
import "./utils/passport.js";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "../../.env",
});

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/api/health", (req: Request, res: Response) => {
  return res.status(200).json({ message: "OK" });
});

app.use("/api/auth", authRouter);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
