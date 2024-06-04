#!/usr/bin/env node

import { Checklist } from "./Checklist.js";

try {
  const checklist = new Checklist();
  await checklist.generate();
  checklist.evaluate();
  console.log(`

  ＊🌙   ☁🌟☁
  *   * 🌟  *   *
    ☁ ╔╗╔╗╔╗╦╗ *
     💤║╦║║║║║║。
     *╚╝╚╝╚╝╩╝
  ╦╗╗╦╔╗╗╔╔╦╗
  ║║║║║╦╠╣ ║ *
  ╩╚╝╩╚╝╝╚ ╩

 `);
  checklist.showScore();
} catch (err) {
  console.error(err);
}
