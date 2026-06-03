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
  const res = await api.post(`/api/report/${picId}`, {
    title,
    reason,
  });
  return res.data;
};

export const getReports = async (): Promise<{ data: ReportType[] }> => {
  const res = await api.get(`/api/report`);
  return res.data;
};

export const getReportById = async (
  reportId: string,
): Promise<{ data: ReportType }> => {
  const res = await api.get(`/api/report/status/${reportId}`);
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
  const res = await api.patch(`/api/report/status/${reportId}`, {
    status,
    note,
  });
  return res.data;
};
