/*
  Warnings:

  - You are about to drop the column `data` on the `Metadata` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Src` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Metadata" DROP COLUMN "data",
ADD COLUMN     "others" JSONB;

-- AlterTable
ALTER TABLE "Src" DROP COLUMN "type";

-- DropEnum
DROP TYPE "Type";
