import {
  getReportById,
  getReports,
  reportImage,
  updateReport,
} from "@/lib/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReportStatus } from "@workspace/types";
import { toast } from "sonner";

export const useCreateReport = () => {
  return useMutation({
    mutationFn: ({
      picId,
      title,
      reason,
    }: {
      picId: string;
      title: string;
      reason: string;
    }) => reportImage({ picId, title, reason }),
    onSuccess: (data) => {
      toast.success("Report submitted successfully.", {
        description: "It may take some time to review the report.",
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to report.");
    },
  });
};

export const useGetReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });
};

export const useGetReportById = (reportId: string) => {
  return useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReportById(reportId),
    enabled: !!reportId,
  });
};

export const useUpdateReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      status,
      note,
      reportId,
    }: {
      status: ReportStatus;
      note: string;
      reportId: string;
    }) => updateReport({ status, note, reportId }),
    onSuccess: (response) => {
      toast.success("Report updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["report", response.data.reportId],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update report.");
    },
  });
};
