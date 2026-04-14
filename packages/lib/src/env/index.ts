import dotenv from "dotenv";
import path from "path";

console.log(process.cwd());

dotenv.config({
  path: path.resolve(process.cwd(), "../../.env"),
});

dotenv.config();
