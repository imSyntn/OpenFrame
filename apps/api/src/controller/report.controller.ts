import { ErrorWithStatus } from "@/middleware";
import {
  getReportList,
  createReport,
  getReportById,
  updateReport,
} from "@/service";
import { kafkaProduceMessage } from "@workspace/lib/kafka";
import { NextFunction, Request, Response } from "express";
import { reportSchema, reportUpdateSchema } from "@workspace/schema/report";
import { logger } from "@workspace/lib";

export const createReportController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      email,
      name,
      id: userId,
    } = req.user as { email: string; name: string; id: string };
    const { picId } = req.params as { picId: string };
    const { title, reason } = reportSchema.parse(req.body);

    if (!picId) {
      return next(new ErrorWithStatus(400, "Picture id is required"));
    }

    const reportId = await createReport(picId, email, userId, title, reason);

    const emailPayload = {
      type: "report-submit",
      data: {
        name,
        reportId,
        contentTitle: title,
        reportReason: reason,
        reportUrl: `${process.env.FRONTEND_URL}/report/status/${reportId}`,
        to: email,
        subject: "Report Submitted",
      },
    };

    try {
      await kafkaProduceMessage("email-queue", JSON.stringify(emailPayload));
    } catch (error) {
      logger.error("Error producing report-submit email message:", error);
    }
    return res.status(200).json({ message: "Reported", data: { reportId } });
  } catch (error) {
    next(error);
  }
};

export const getReportByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { reportId } = req.params as { reportId: string };
    const { email: userEmail } = req.user as { id: string; email: string };

    if (!reportId) {
      return next(new ErrorWithStatus(400, "Invalid report id"));
    }

    const report = await getReportById(reportId);

    if (!report) {
      return next(new ErrorWithStatus(404, "Report not found"));
    }

    const isAdmin = userEmail === process.env.ADMIN_EMAIL;

    return res.status(200).json({ data: { ...report, isAdmin } });
  } catch (error) {
    next(error);
  }
};

export const updateReportController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { reportId } = req.params as { reportId: string };
    const { status, note } = reportUpdateSchema.parse(req.body);

    if (!reportId) {
      return next(new ErrorWithStatus(400, "Invalid report id"));
    }

    const report = await updateReport(reportId, status, note);

    if (!report) {
      return next(new ErrorWithStatus(404, "Report not found"));
    }

    const emailPayload = {
      type: "report-updated",
      data: {
        reportId,
        contentTitle: report.title,
        reportUrl: `${process.env.FRONTEND_URL}/report/status/${reportId}`,
        status,
        note: note ?? "-",
        to: report.user_email,
        subject: "Report Status Updated",
      },
    };
    try {
      await kafkaProduceMessage("email-queue", JSON.stringify(emailPayload));
    } catch (error) {
      logger.error("Error producing report-updated email message:", error);
    }
    return res
      .status(200)
      .json({ message: "Report updated", data: { reportId } });
  } catch (error) {
    next(error);
  }
};

export const reportListController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as { id: string; email: string };
    const isAdmin = user?.email === process.env.ADMIN_EMAIL;
    const reports = await getReportList(isAdmin, user?.id);

    return res.status(200).json({ data: reports });
  } catch (error) {
    next(error);
  }
};
