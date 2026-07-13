import "@workspace/lib/env";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {
  authRouter,
  collectionRouter,
  pictureRouter,
  reportRouter,
  searchRouter,
} from "@/routes";
import passport from "passport";
import "./utils/passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  apiLimiter,
  compressionMiddleware,
  errorMiddleware,
} from "./middleware";

const app: Application = express();

app.set("trust proxy", 1);

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(compressionMiddleware);

app.get("/api/health", (req: Request, res: Response) => {
  return res.status(200).json({ message: "OK" });
});

app.use("/api", apiLimiter);

app.use("/api/user", authRouter);
app.use("/api/picture", pictureRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/search", searchRouter);
app.use("/api/report", reportRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
