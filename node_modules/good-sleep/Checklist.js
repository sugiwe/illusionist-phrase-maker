import inquirer from "inquirer";
import { questionAnswerPairs } from "./questionAnswerPairData.js";

export class Checklist {
  constructor() {
    this.checklist = [];
  }

  async generate() {
    const questions = Object.keys(questionAnswerPairs);

    for (const question of questions) {
      const answer = await inquirer.prompt({
        type: "confirm",
        name: "answer",
        message: question,
      });

      this.checklist.push({ question, answer: answer.answer });
    }
  }

  evaluate() {
    const suggestions = [];
    for (const item of this.checklist) {
      if (!item.answer) {
        suggestions.push({
          item: item.question,
          suggestion: questionAnswerPairs[item.question],
        });
      }
    }

    if (suggestions.length > 0) {
      console.log("以下の項目について改善が必要です：\n");
      for (const suggestion of suggestions) {
        console.log(
          `項目: ${suggestion.item}\n提案: ${suggestion.suggestion}\n`,
        );
      }
    }
  }

  showScore() {
    const countTrueAnswers = this.checklist.filter(
      (item) => item.answer === true,
    ).length;
    console.log(`あなたの快眠準備度は、${countTrueAnswers * 10}点です。`);
  }
}
