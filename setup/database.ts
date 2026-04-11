import { prisma } from "@workspace/lib/prisma";

export async function setupDatabase() {
  console.log("Setting up database...");

  await prisma.$executeRawUnsafe(`
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE EXTENSION IF NOT EXISTS unaccent;
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Picture" ADD COLUMN IF NOT EXISTS search_vector tsvector;
    ALTER TABLE "User" ADD COLUMN IF NOT EXISTS search_vector tsvector;
    ALTER TABLE "Tag" ADD COLUMN IF NOT EXISTS search_vector tsvector;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION update_picture_search() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector :=
        to_tsvector(
          'english',
          coalesce(NEW.title,'') || ' ' ||
          coalesce(NEW.description,'') || ' ' ||
          coalesce((
            SELECT string_agg(t.name, ' ')
            FROM "PicTag" pt
            JOIN "Tag" t ON t.id = pt.tag_id
            WHERE pt.pic_id = NEW.id
          ), '')
        );
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await prisma.$executeRawUnsafe(`
    DROP TRIGGER IF EXISTS picture_search_trigger ON "Picture";

    CREATE TRIGGER picture_search_trigger
    BEFORE INSERT OR UPDATE ON "Picture"
    FOR EACH ROW
    EXECUTE FUNCTION update_picture_search();
  `);

  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION update_picture_from_tag() RETURNS trigger AS $$
    BEGIN
      UPDATE "Picture"
      SET search_vector =
        to_tsvector(
          'english',
          coalesce(title,'') || ' ' ||
          coalesce(description,'') || ' ' ||
          (
            SELECT string_agg(t.name, ' ')
            FROM "PicTag" pt
            JOIN "Tag" t ON t.id = pt.tag_id
            WHERE pt.pic_id = NEW.pic_id
          )
        )
      WHERE id = NEW.pic_id;

      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
  `);

  await prisma.$executeRawUnsafe(`
    DROP TRIGGER IF EXISTS pictag_trigger ON "PicTag";

    CREATE TRIGGER pictag_trigger
    AFTER INSERT ON "PicTag"
    FOR EACH ROW
    EXECUTE FUNCTION update_picture_from_tag();
  `);

  await prisma.$executeRawUnsafe(`
    UPDATE "User"
    SET search_vector = to_tsvector('english', coalesce(name,''));

    UPDATE "Tag"
    SET search_vector = to_tsvector('english', coalesce(name,''));
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS picture_search_idx ON "Picture" USING GIN(search_vector);
    CREATE INDEX IF NOT EXISTS user_search_idx ON "User" USING GIN(search_vector);
    CREATE INDEX IF NOT EXISTS tag_search_idx ON "Tag" USING GIN(search_vector);

    CREATE INDEX IF NOT EXISTS picture_trgm_idx ON "Picture" USING GIN(title gin_trgm_ops);
    CREATE INDEX IF NOT EXISTS user_trgm_idx ON "User" USING GIN(name gin_trgm_ops);
    CREATE INDEX IF NOT EXISTS tag_trgm_idx ON "Tag" USING GIN(name gin_trgm_ops);

    CREATE INDEX IF NOT EXISTS src_pic_res_idx ON "Src"(pic_id, resolution);
  `);

  console.log("✅ Database setup complete");
}
