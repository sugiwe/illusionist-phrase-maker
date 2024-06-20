import { createInterface } from "readline";
import { TextTransformer } from "./text-transformer.js";
import enquirer from "enquirer";
import { messages } from "./messages.js";

const PROCESSING_CHAR_DELAY = 500;
const PROCESSING_WAIT_TIME = 2000;
const TEXT_DISPLAY_SPEED = 50;

export class IllusionistPhraseMakerCLI {
  constructor() {
    this.textTransformer = new TextTransformer();
  }

  async displayWelcomeMessage() {
    console.log(messages.longLine);
    await this.#printTextByChar(messages.welcome);
    console.log(messages.longLine);
  }

  initializeInput() {
    this.inputText = "";
    this.#setUpReadlineInterface();
    this.#promptUserInput();
  }

  #setUpReadlineInterface() {
    if (this.rl) {
      this.rl.close();
    }
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let hasInput = false;

    this.rl.on("line", (line) => {
      this.inputText += line + "\n";
      hasInput = true;
    });

    this.rl.on("close", async () => {
      if (!hasInput || this.inputText.trim() === "") {
        await this.#printTextByChar(messages.interrupt);
        process.exit(0);
      } else {
        const transformedText = this.textTransformer.transformText(
          this.inputText,
        );
        if (transformedText === null) {
          await this.#printTextByChar(messages.noTransform);
          console.log(messages.longLine);
          this.initializeInput();
        } else {
          await this.#displayProcessing();
          await this.#displayTransformedText(transformedText);
          const choiceRepeat = await this.#askRepeatOrQuit();
          if (choiceRepeat) {
            this.initializeInput();
          } else {
            console.log(messages.longLine);
            await this.#printTextByChar(messages.goodbye);
            console.log(messages.longLine);
            process.exit(0);
          }
        }
      }
    });
  }

  async #promptUserInput() {
    await this.#printTextByChar(messages.prompt);
    this.rl.prompt();
  }

  async #displayProcessing() {
    console.log(messages.longLine);
    await this.#printTextByChar(messages.startProcessing);
    console.log(messages.longLine);
    const parts = messages.underProcessing;
    for (const part of parts) {
      process.stdout.write(part);
      await new Promise((resolve) =>
        setTimeout(resolve, PROCESSING_CHAR_DELAY),
      );
    }
    await new Promise((resolve) => setTimeout(resolve, PROCESSING_WAIT_TIME));
    process.stdout.cursorTo(0);
    process.stdout.clearLine();
  }

  async #displayTransformedText(transformedText) {
    console.log(messages.longLine);
    await this.#printTextByChar(messages.transformed);
    console.log(messages.longLine);
    console.log(transformedText);
    console.log(messages.longLine);
  }

  async #printTextByChar(text) {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        process.stdout.write(text[index]);
        index++;
        if (index === text.length) {
          clearInterval(interval);
          console.log();
          resolve();
        }
      }, TEXT_DISPLAY_SPEED);
    });
  }

  async #askRepeatOrQuit() {
    console.log(messages.longLine);
    await this.#printTextByChar(messages.repeat);
    console.log(messages.longLine);
    const response = await enquirer.prompt({
      type: "select",
      name: "action",
      message: messages.askRepeat.message,
      choices: messages.askRepeat.choices,
    });

    return response.action === messages.askRepeat.choices[0].value;
  }
}
