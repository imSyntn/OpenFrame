import { prisma } from "@workspace/lib/prisma";

export const searchPictures = async (q: string) => {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
      p.id,
      p.title,
      s.url AS src,
      ts_rank(p.search_vector, plainto_tsquery($1)) AS rank,
      similarity(p.title, $1) AS sim

    FROM "Picture" p

    LEFT JOIN LATERAL (
      SELECT url
      FROM "Src" s
      WHERE s.pic_id = p.id
      ORDER BY 
        CASE 
          WHEN s.resolution = 'SMALL' THEN 1
          WHEN s.resolution = 'ORIGINAL' THEN 2
          ELSE 3
        END
      LIMIT 1
    ) s ON true

    WHERE
      p.search_vector @@ plainto_tsquery($1)
      OR similarity(p.title, $1) > 0.3

    ORDER BY rank DESC, sim DESC
    LIMIT 12;
  `,
    q,
  );
};

export const searchUsers = async (q: string) => {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
      u.id,
      u.name,
      u.avatar,
      ts_rank(u.search_vector, plainto_tsquery($1)) AS rank,
      similarity(u.name, $1) AS sim

    FROM "User" u

    WHERE
      u.search_vector @@ plainto_tsquery($1)
      OR similarity(u.name, $1) > 0.3

    ORDER BY rank DESC, sim DESC
    LIMIT 6;
  `,
    q,
  );
};

export const searchTags = async (q: string) => {
  return prisma.$queryRawUnsafe(
    `
    SELECT 
      t.id,
      t.name,
      ts_rank(t.search_vector, plainto_tsquery($1)) AS rank,
      similarity(t.name, $1) AS sim

    FROM "Tag" t

    WHERE
      t.search_vector @@ plainto_tsquery($1)
      OR similarity(t.name, $1) > 0.3

    ORDER BY rank DESC, sim DESC
    LIMIT 6;
  `,
    q,
  );
};
