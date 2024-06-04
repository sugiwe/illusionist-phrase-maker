import { CLIManager } from "./src/user-interaction.js";

async function main() {
  const cliManager = new CLIManager();
  await cliManager.displayWelcomeMessage();
  cliManager.promptUserInput();
}

main();
