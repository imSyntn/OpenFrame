import { api } from "../axios";
import { ReportStatus, ReportType } from "@workspace/types";

export const reportImage = async ({
  picId,
  title,
  reason,
}: {
  picId: string;
  title: string;
  reason: string;
}): Promise<{ message: string; data: { reportId: string } }> => {
  const res = await api.post(`/report/${picId}`, {
    title,
    reason,
  });
  return res.data;
};

export const getReports = async (): Promise<{ data: ReportType[] }> => {
  const res = await api.get(`/report`);
  return res.data;
};

export const getReportById = async (
  reportId: string,
): Promise<{ data: ReportType }> => {
  const res = await api.get(`/report/status/${reportId}`);
  return res.data;
};

export const updateReport = async ({
  status,
  note,
  reportId,
}: {
  status: ReportStatus;
  note?: string;
  reportId: string;
}): Promise<{ message: string; data: { reportId: string } }> => {
  const res = await api.patch(`/report/status/${reportId}`, {
    status,
    note,
  });
  return res.data;
};
