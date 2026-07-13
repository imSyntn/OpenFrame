-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'REJECTED', 'RESOLVED');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "pic_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "reason" VARCHAR(4000) NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Report_user_id_idx" ON "Report"("user_id");

-- CreateIndex
CREATE INDEX "Report_pic_id_idx" ON "Report"("pic_id");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
