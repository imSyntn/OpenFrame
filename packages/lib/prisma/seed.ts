import { prisma } from "../src/db/prisma.js";

const USER_COUNT = 15;
const PHOTO_COUNT = 100;

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

async function main() {
  console.log("🌱 Seeding database (fast mode)");

  const users = Array.from({ length: USER_COUNT }).map((_, i) => ({
    id: `user_${i}`,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    bio: "Photography enthusiast",
    location: "Earth",
    is_verified: i % 3 === 0,
  }));

  await prisma.user.createMany({
    data: users,
  });

  await prisma.metrics.createMany({
    data: users.map((u) => ({
      user_id: u.id,
      follower: randomInt(500),
      following: randomInt(200),
      total_downloads: randomInt(10000),
      total_likes: randomInt(5000),
    })),
  });

  const links = users.flatMap((u) => [
    {
      user_id: u.id,
      name: "github",
      url: `https://github.com/${u.name.toLowerCase().replace(" ", "")}`,
    },
    {
      user_id: u.id,
      name: "portfolio",
      url: `https://${u.name.toLowerCase().replace(" ", "")}.dev`,
    },
  ]);

  await prisma.links.createMany({ data: links });

  const tagNames = [
    "nature",
    "mountain",
    "city",
    "portrait",
    "travel",
    "sunset",
    "beach",
    "architecture",
  ];

  await prisma.tag.createMany({
    data: tagNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const tags = await prisma.tag.findMany();

  const pictures = Array.from({ length: PHOTO_COUNT }).map((_, i) => {
    const user = users[randomInt(users.length)];

    return {
      id: `pic_${i}`,
      user_id: user?.id,
      title: `Photo ${i}`,
      alt: `Photo ${i}`,
      description: "Generated seed photo",
    };
  });

  await prisma.picture.createMany({
    data: pictures,
  });

  await prisma.metadata.createMany({
    data: pictures.map((p) => ({
      pic_id: p.id,
      camera: "Sony A7III",
      lens: "24-70mm",
      shutter: "1/200",
      iso: "100",
      focal_length: "35mm",
      aperture: "f/2.8",
      dominant_color: "#888888",
      blurhash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    })),
  });

  await prisma.engagement.createMany({
    data: pictures.map((p) => ({
      pic_id: p.id,
      views: randomInt(5000),
      downloads: randomInt(1000),
      likes: randomInt(800),
    })),
  });

  const srcRows = pictures.flatMap((p) => [
    {
      pic_id: p.id,
      resolution: "ORIGINAL",
      url: `https://picsum.photos/id/${randomInt(200)}/2000/1500`,
      width: 2000,
      height: 1500,
      type: "JPG",
      size: 4000000,
    },
    {
      pic_id: p.id,
      resolution: "MEDIUM",
      url: `https://picsum.photos/id/${randomInt(200)}/800/600`,
      width: 800,
      height: 600,
      type: "JPG",
      size: 400000,
    },
  ]);

  await prisma.src.createMany({
    data: srcRows,
  });

  const picTags = pictures.map((p) => ({
    pic_id: p.id,
    tag_id: tags[randomInt(tags.length)].id,
  }));

  await prisma.picTag.createMany({
    data: picTags,
  });

  console.log("✅ Fast seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
