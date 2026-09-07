import { createRequire } from "node:module";
import path from "node:path";
import * as nsfwjs from "nsfwjs";

const require = createRequire(import.meta.url);

type ImageMetadata = {
  title: string;
  tags: { id: number; name: string }[];
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "with",
  "and",
  "or",
  "of",
  "in",
  "on",
  "at",
  "to",
  "for",
  "from",
  "by",
]);

const IGNORE_WORDS = new Set([
  "highly",
  "detailed",
  "quality",
  "best",
  "masterpiece",
  "beautiful",
  "stunning",
  "lighting",
]);

export function extractTitleAndTagsFromPrompt(prompt: string): ImageMetadata {
  const normalized = prompt
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = normalized
    .split(" ")
    .filter(
      (word) =>
        word.length > 2 && !STOP_WORDS.has(word) && !IGNORE_WORDS.has(word),
    );

  const tags = [...new Set(words)].slice(0, 10).map((word, index) => ({
    name: word,
    id: index,
  }));

  const title = tags
    .slice(0, 4)
    .map((tag) => tag.name.charAt(0).toUpperCase() + tag.name.slice(1))
    .join(" ");

  return {
    title,
    tags,
  };
}

// Find the installed tfjs-node package.
const tfjsNodePackagePath =
  require.resolve("@tensorflow/tfjs-node/package.json");

const tensorflowLibPath = path.join(
  path.dirname(tfjsNodePackagePath),
  "deps",
  "lib",
);

// Windows needs this so tfjs_binding.node can find tensorflow.dll.
if (process.platform === "win32") {
  process.env.PATH = [tensorflowLibPath, process.env.PATH ?? ""].join(
    path.delimiter,
  );
}

const tfjs = await import("@tensorflow/tfjs-node");

let modelPromise: Promise<nsfwjs.NSFWJS> | null = null;

export function getModel() {
  if (!modelPromise) {
    modelPromise = nsfwjs.load("InceptionV3");
  }

  return modelPromise;
}

export { tfjs };
