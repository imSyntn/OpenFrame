import { Router } from "express";
import {
  createReportController,
  getReportByIdController,
  reportListController,
  updateReportController,
} from "@/controller";
import { authMiddleware, isAdmin, reportLimiter } from "@/middleware";

const reportRouter = Router();

reportRouter.get("/status/:reportId", authMiddleware, getReportByIdController);
reportRouter.patch(
  "/status/:reportId",
  authMiddleware,
  isAdmin,
  updateReportController,
);

reportRouter.post(
  "/:picId",
  reportLimiter,
  authMiddleware,
  createReportController,
);

reportRouter.get("/", authMiddleware, reportListController);

export { reportRouter };
