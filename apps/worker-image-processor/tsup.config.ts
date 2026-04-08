import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  sourcemap: true,
  clean: true,
  splitting: false,
  external: [
    /node_modules/,
    "@workspace/lib",
    "@workspace/constants",
    "@workspace/schema",
    "@workspace/types",
  ],
});
