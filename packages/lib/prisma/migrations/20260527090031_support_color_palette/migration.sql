-- AlterTable
ALTER TABLE "Metadata" ADD COLUMN     "palette" TEXT[] DEFAULT ARRAY[]::TEXT[];
