import { MAGIC_NUMBERS } from "./magic-numbers.js";

export class TextTransformer {
  constructor() {
    this.symbols = [
      { symbol: "♦", probability: 0.24 },
      { symbol: "♣", probability: 0.24 },
      { symbol: "♥", probability: 0.24 },
      { symbol: "♠", probability: 0.24 },
      { symbol: "♪", probability: 0.03 },
      { symbol: "💀", probability: 0.01 },
    ];
  }

  transformText(inputText) {
    if (!inputText.includes("。")) {
      return null;
    }
    const sentences = inputText.split(/(?<=[。])/g);
    let transformedText = sentences
      .map((sentence) => this._transformSentence(sentence))
      .join("")
      .trim();

    transformedText = this._insertLineBreaks(transformedText, MAGIC_NUMBERS.CHARACTERS_PER_LINE);

    return transformedText;
  }

  _transformSentence(sentence) {
    const fakePattern = /フェイク|偽物/;
    const lovePattern = /恋|好き|愛/;
    const funPattern = /楽しい|たのしい/;

    if (fakePattern.test(sentence)) {
      return sentence.replace(/。$/, "(⭐️-_-💧)");
    }
    if (lovePattern.test(sentence)) {
      return sentence.replace(/。$/, "♥");
    }
    if (funPattern.test(sentence)) {
      return sentence.replace(/。$/, "♪");
    }
    return sentence.replace(/。/g, () => this.randomSymbol());
  }

  randomSymbol() {
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (let { symbol, probability } of this.symbols) {
      cumulativeProbability += probability;
      if (rand < cumulativeProbability) {
        return symbol;
      }
    }
  }

  _insertLineBreaks(text, lineLength) {
    const lines = text.split("\n");
    const result = [];

    for (let line of lines) {
      while (line.length > lineLength) {
        result.push(line.slice(0, lineLength));
        line = line.slice(lineLength);
      }
      result.push(line);
    }
    return result.join("\n");
  }
}
