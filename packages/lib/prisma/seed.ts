import { prisma } from "../src/prisma";

async function main() {
  console.log("Seeding database...");

  const user = await prisma.user.create({
    data: {
      name: "Sayantan Sarkar",
      email: "imsyntn@gmail.com",
      avatar:
        "https://open-frame.t3.tigrisfiles.io/avatars/hhaL4MGvccsp0_jzCPK22.jpeg",
      bio: "Photography enthusiast without access token",
      is_verified: true,
      location: "Earth, Milky way, univese",
      password: "123",
      metrics: {
        create: {
          total_likes: 789,
          total_downloads: 456,
        },
      },
      links: {
        create: [
          {
            name: "instagram",
            url: "https://instagram.com/arjun_sen",
          },
          {
            name: "github",
            url: "https://github.com/imSyntn",
          },
          {
            name: "portfolio",
            url: "https://sayantan.online",
          },
        ],
      },
    },
  });

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

  const picture = await prisma.picture.create({
    data: {
      user_id: user.id,
      description: "No desctiption",
      alt: "mountain",
      title: "mountain",
      src: {
        create: [
          {
            resolution: "ORIGINAL",
            url: "https://open-frame.t3.tigrisfiles.io/pictures/AFpoFNwLGRIhzcKMA9JHo.jpeg",
            size: 1798032,
            height: 2688,
            width: 4032,
          },
          {
            resolution: "LARGE",
            url: "https://open-frame.t3.tigrisfiles.io/pictures/AFpoFNwLGRIhzcKMA9JHo_large.jpg",
            size: 231999,
            height: 1280,
            width: 1920,
          },
          {
            resolution: "MEDIUM",
            url: "https://open-frame.t3.tigrisfiles.io/pictures/AFpoFNwLGRIhzcKMA9JHo_medium.jpg",
            size: 127781,
            height: 853,
            width: 1280,
          },
          {
            resolution: "SMALL",
            url: "https://open-frame.t3.tigrisfiles.io/pictures/AFpoFNwLGRIhzcKMA9JHo_small.jpg",
            size: 45171,
            height: 427,
            width: 640,
          },
          {
            resolution: "THUMBNAIL",
            url: "https://open-frame.t3.tigrisfiles.io/pictures/AFpoFNwLGRIhzcKMA9JHo_thumbnail.jpg",
            size: 10690,
            height: 171,
            width: 256,
          },
        ],
      },
      tags: {
        create: [
          {
            tag: {
              connect: {
                name: "nature",
              },
            },
          },
          {
            tag: {
              connect: {
                name: "sunset",
              },
            },
          },
          {
            tag: {
              connect: {
                name: "travel",
              },
            },
          },
        ],
      },
      metadata: {
        create: {
          dominant_color: "#bc533c",
          blurhash: "UVI;ba=_RkNL_Nt6NHNI0gI@NHsmV_Rnj[xY",
          others: {
            XResolution: 72,
            YResolution: 72,
          },
        },
      },
      engagement: {
        create: {
          views: 123,
          downloads: 456,
          likes: 789,
        },
      },
    },
  });

  await prisma.collection.create({
    data: {
      creator_id: user.id,
      title: "Collection 1",
      description: "This is collection 1",
      visibility: "PUBLIC",
      items: {
        create: {
          pic_id: picture.id,
        },
      },
    },
  });
  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
