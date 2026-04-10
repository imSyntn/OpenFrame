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
  searchRouter,
} from "@/routes";
import passport from "passport";
import "./utils/passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware, ErrorWithStatus } from "./middleware";

const app: Application = express();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// app.use((req, res, next) => {
//   console.log(req.path);
//   if (req.path == "/api/user/cmmho0rve0000twobb6htytky") {
//     return next(new ErrorWithStatus(500, "Intentionally omething went wrong"));
//   }
//   next();
// });

app.get("/api/health", (req: Request, res: Response) => {
  return res.status(200).json({ message: "OK" });
});

app.use("/api/user", authRouter);
app.use("/api/picture", pictureRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/search", searchRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started on port 4000");
});
