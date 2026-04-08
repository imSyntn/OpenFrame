import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/authSchema.ts",
    "src/pictureSchema.ts",
    "src/collectionSchema.ts",
  ],
  format: ["esm"],
  target: "node20",
  dts: true,
  clean: true,
  splitting: false,
  noExternal: ["@workspace/constants"],
});
