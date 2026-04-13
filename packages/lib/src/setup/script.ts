import { SetupIndexing } from "./indexSearch";
import { setupKafka } from "./kafka";

async function main() {
  console.log("🚀 Setting up project...");

  await setupKafka();
  await SetupIndexing();

  console.log("✅ Setup complete");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Setup failed:", err);
    process.exit(1);
  });
