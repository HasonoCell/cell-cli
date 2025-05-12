#!/usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
import fs from "node:fs";
import { checkPath, downloadTemplate } from "../utils/index.js";

let json = fs.readFileSync("./package.json");
json = JSON.parse(json.toString());

program
  .version(json.version, "-V, --version", "output current version")
  .option("-v", "output current version", () => console.log(json.version));

program
  .command("create <project-name>")
  .alias("c")
  .description("create project")
  .action((projectName) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "projectName",
          message: "请输入项目名称:",
          default: projectName,
        },
        {
          type: "confirm",
          name: "isSupportTS",
          message: "是否支持 TypeScript?",
        },
      ])
      .then((res) => {
        if (checkPath(res.projectName)) {
          console.log("文件夹已存在!");
          return;
        }
        if (res.isSupportTS) {
          downloadTemplate("ts", res.projectName);
          return;
        }
        downloadTemplate("js", res.projectName);
      });
  });

program.parse(process.argv);
