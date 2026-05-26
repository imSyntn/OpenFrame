-- CreateEnum
CREATE TYPE "License" AS ENUM ('ALL_RIGHTS_RESERVED', 'CC_BY_4_0', 'CC_BY_SA_4_0', 'CC_BY_NC_4_0', 'CC0_1_0');

-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "license" "License" NOT NULL DEFAULT 'CC0_1_0';
