import { cache, prisma, ReportStatus } from "@workspace/lib";

export const createReport = async (
  pictureId: string,
  email: string,
  userId: string,
  title: string,
  reason: string,
) => {
  const data = await prisma.report.create({
    data: {
      picture: {
        connect: {
          id: pictureId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      user_email: email,
      title,
      reason,
    },
  });

  return data.id;
};

export const getReportById = async (reportId: string) => {
  const cacheKey = `report:${reportId}`;
  const cacheData = await cache.get(cacheKey);
  if (cacheData) {
    return JSON.parse(cacheData);
  }

  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
    include: {
      picture: {
        select: {
          src: true,
        },
      },
    },
  });

  if (!report) {
    return null;
  }

  await cache.set(cacheKey, JSON.stringify(report), "EX", 60 * 60 * 24);

  return report;
};

export const getReportList = async (admin: boolean, userId?: string) => {
  if (admin) {
    const cacheKey = `report:admin`;
    const cacheData = await cache.get(cacheKey);
    if (cacheData) {
      return JSON.parse(cacheData);
    }

    const reports = await prisma.report.findMany({
      include: {
        picture: {
          select: {
            src: true,
          },
        },
      },
    });
    await cache.set(cacheKey, JSON.stringify(reports));
    await cache.expire(cacheKey, 60 * 60 * 24);

    return reports;
  }

  if (userId) {
    const cacheKey = `report:user:${userId}`;
    const cacheData = await cache.get(cacheKey);
    if (cacheData) {
      return JSON.parse(cacheData);
    }

    const reports = await prisma.report.findMany({
      where: {
        user_id: userId,
      },
    });

    await cache.set(cacheKey, JSON.stringify(reports));
    await cache.expire(cacheKey, 60 * 60 * 24 * 30);

    return reports;
  }

  return [];
};

export const updateReport = async (
  reportId: string,
  status: string,
  note?: string,
) => {
  const cacheKey = `report:${reportId}`;

  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
  });

  if (!report) {
    return null;
  }

  const updateReport = await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      status: status as ReportStatus,
      note,
    },
    include: {
      picture: {
        select: {
          src: true,
        },
      },
    },
  });

  if (!updateReport) {
    return null;
  }

  await cache.set(cacheKey, JSON.stringify(updateReport), "EX", 60 * 60 * 24);

  return updateReport;
};
