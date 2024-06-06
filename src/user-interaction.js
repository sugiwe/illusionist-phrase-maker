import { createInterface } from "readline";
import { TextTransformer } from "./text-transformer.js";
import enquirer from "enquirer";
import { messages } from "./messages.js";
import { MAGIC_NUMBERS } from "./magic-numbers.js";
const { prompt } = enquirer;

export class CLIManager {
  constructor() {
    this.textTransformer = new TextTransformer();
    this.inputText = "";
    this.setUpReadlineInterface();
  }

  async displayWelcomeMessage() {
    console.log(messages.longLine);
    await this.printTextByChar(messages.welcome);
    console.log(messages.longLine);
  }

  async promptUserInput() {
    await this.printTextByChar(messages.prompt);
    this.rl.prompt();
  }

  setUpReadlineInterface() {
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
        await this.printTextByChar(messages.interrupt);
        this.rl.close();
        process.exit(0);
      } else {
        const transformedText = this.textTransformer.transformText(
          this.inputText,
        );
        if (transformedText === null) {
          await this.printTextByChar(messages.noTransform);
          console.log(messages.longLine);
          this.inputText = "";
          this.setUpReadlineInterface();
          this.promptUserInput();
        } else {
          await this.displayProcessing();
          await this.displayTransformedText(transformedText);
          this.inputText = "";
          this.promptUserInput();
        }
      }
    });
  }

  async displayProcessing() {
    console.log(messages.longLine);
    await this.printTextByChar(messages.processing);
    console.log(messages.longLine);
    const parts = ["♦…", "変…", "♣…", "換…", "♥…", "中…", "♠"];
    for (const part of parts) {
      process.stdout.write(part);
      await new Promise((resolve) =>
        setTimeout(resolve, MAGIC_NUMBERS.PROCESSING_CHAR_DELAY),
      );
    }
    await new Promise((resolve) =>
      setTimeout(resolve, MAGIC_NUMBERS.PROCESSING_WAIT_TIME),
    );
    process.stdout.cursorTo(0);
    process.stdout.clearLine();
  }

  async displayTransformedText(transformedText) {
    console.log(messages.longLine);
    await this.printTextByChar(messages.transformed);
    console.log(messages.longLine);
    console.log(transformedText);
    console.log(messages.longLine);
    await this.askRepeatOrQuit();
  }

  async printTextByChar(text, delay = MAGIC_NUMBERS.TEXT_DISPLAY_SPEED) {
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
      }, delay);
    });
  }

  async askRepeatOrQuit() {
    console.log(messages.longLine);
    await this.printTextByChar(messages.repeat);
    console.log(messages.longLine);
    const response = await prompt({
      type: "select",
      name: "action",
      message: "選んでね♦:",
      choices: ["もう一度やる", "終わる"],
    });

    if (response.action === "もう一度やる") {
      this.inputText = "";
      this.setUpReadlineInterface();
    } else {
      console.log(messages.longLine);
      await this.printTextByChar(messages.goodbye);
      console.log(messages.longLine);
      this.rl.close();
      process.exit(0);
    }
  }
}
