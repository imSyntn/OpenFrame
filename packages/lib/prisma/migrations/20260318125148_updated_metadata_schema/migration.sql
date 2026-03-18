/*
  Warnings:

  - You are about to drop the column `aperture` on the `Metadata` table. All the data in the column will be lost.
  - You are about to drop the column `camera` on the `Metadata` table. All the data in the column will be lost.
  - You are about to drop the column `focal_length` on the `Metadata` table. All the data in the column will be lost.
  - You are about to drop the column `iso` on the `Metadata` table. All the data in the column will be lost.
  - You are about to drop the column `lens` on the `Metadata` table. All the data in the column will be lost.
  - You are about to drop the column `shutter` on the `Metadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Metadata" DROP COLUMN "aperture",
DROP COLUMN "camera",
DROP COLUMN "focal_length",
DROP COLUMN "iso",
DROP COLUMN "lens",
DROP COLUMN "shutter",
ADD COLUMN     "data" JSONB;
