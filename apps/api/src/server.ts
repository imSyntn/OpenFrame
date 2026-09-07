import "@workspace/lib/env";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {
  apiRouter,
  authRouter,
  collectionRouter,
  pictureRouter,
  reportRouter,
  searchRouter,
  textToImageRouter,
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
import { handleApi, handleInternalTokenCors } from "./middleware/apiHandler";
import { generateInternalToken } from "./utils";

const app: Application = express();

app.set("trust proxy", 1);

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(compressionMiddleware);

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({ message: "OK" });
});

app.use(apiLimiter);

app.get(
  "/internal-token",
  handleInternalTokenCors,
  (req: Request, res: Response) => {
    const token = generateInternalToken();

    return res.status(200).json({
      token,
    });
  },
);

app.use(handleApi);

app.use("/user", authRouter);
app.use("/picture", pictureRouter);
app.use("/text-to-image", textToImageRouter);
app.use("/collection", collectionRouter);
app.use("/search", searchRouter);
app.use("/report", reportRouter);
app.use("/keys", apiRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
