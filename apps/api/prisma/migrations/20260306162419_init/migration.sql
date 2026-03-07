-- CreateEnum
CREATE TYPE "Resolution" AS ENUM ('ORIGINAL', 'LARGE', 'MEDIUM', 'SMALL', 'THUMBNAIL');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('JPG', 'PNG', 'WEBP');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "email" TEXT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
    "bio" VARCHAR(160),
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "location" VARCHAR(100),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "url" VARCHAR(150) NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metrics" (
    "user_id" TEXT NOT NULL,
    "follower" INTEGER NOT NULL DEFAULT 0,
    "following" INTEGER NOT NULL DEFAULT 0,
    "total_downloads" INTEGER NOT NULL DEFAULT 0,
    "total_likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- CreateTable
CREATE TABLE "Like" (
    "user_id" TEXT NOT NULL,
    "pic_id" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("user_id","pic_id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" VARCHAR(4000),
    "alt" VARCHAR(150) NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Src" (
    "id" SERIAL NOT NULL,
    "pic_id" TEXT NOT NULL,
    "resolution" "Resolution" NOT NULL,
    "url" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Src_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "pic_id" TEXT NOT NULL,
    "camera" TEXT,
    "lens" TEXT,
    "shutter" TEXT,
    "iso" TEXT,
    "focal_length" TEXT,
    "aperture" TEXT,
    "dominant_color" TEXT NOT NULL,
    "blurhash" TEXT NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("pic_id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PicTag" (
    "pic_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "PicTag_pkey" PRIMARY KEY ("pic_id","tag_id")
);

-- CreateTable
CREATE TABLE "Engagement" (
    "pic_id" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("pic_id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "description" VARCHAR(4000),
    "cover_image" TEXT NOT NULL DEFAULT 'https://placehold.net/main.svg',
    "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionItem" (
    "collection_id" TEXT NOT NULL,
    "pic_id" TEXT NOT NULL,

    CONSTRAINT "CollectionItem_pkey" PRIMARY KEY ("collection_id","pic_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Links_user_id_idx" ON "Links"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Links_user_id_name_key" ON "Links"("user_id", "name");

-- CreateIndex
CREATE INDEX "Follow_follower_id_idx" ON "Follow"("follower_id");

-- CreateIndex
CREATE INDEX "Like_user_id_idx" ON "Like"("user_id");

-- CreateIndex
CREATE INDEX "Picture_user_id_id_idx" ON "Picture"("user_id", "id");

-- CreateIndex
CREATE INDEX "Src_pic_id_idx" ON "Src"("pic_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "PicTag_tag_id_idx" ON "PicTag"("tag_id");

-- CreateIndex
CREATE INDEX "Collection_creator_id_idx" ON "Collection"("creator_id");

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metrics" ADD CONSTRAINT "Metrics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Src" ADD CONSTRAINT "Src_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PicTag" ADD CONSTRAINT "PicTag_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PicTag" ADD CONSTRAINT "PicTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_pic_id_fkey" FOREIGN KEY ("pic_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
