import { SetupIndexing } from "./indexSearch";
import { setupKafka } from "./kafka";
// import { setupDatabase } from "./database";

async function main() {
  console.log("🚀 Setting up project...");

  await setupKafka();
  await SetupIndexing();
  // await setupDatabase();

  console.log("✅ Setup complete");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Setup failed:", err);
    process.exit(1);
  });
