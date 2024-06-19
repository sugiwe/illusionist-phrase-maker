#!/usr/bin/env node

import { IllusionistPhraseMakerCLI } from "./src/illusionist-phrase-maker-cli.js";

async function main() {
  const illusionistPhraseMakerCLI = new IllusionistPhraseMakerCLI();
  await illusionistPhraseMakerCLI.displayWelcomeMessage();
  illusionistPhraseMakerCLI.initializeInput();
}

main();
