import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/logger/index.ts",
    "src/kafka/index.ts",
    "src/redis/index.ts",
    "src/env/index.ts",
    "src/prisma/index.ts",
  ],
  format: ["esm"],
  target: "node20",
  dts: true,
  clean: true,
  splitting: false,
});
