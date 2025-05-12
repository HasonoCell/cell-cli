import fs from "node:fs";
import download from "download-git-repo";
import ora from "ora";

const spinner = ora("下载中...");

// 验证路径
export const checkPath = (path) => {
  return fs.existsSync(path);
};

// 下载模板
export const downloadTemplate = (branch, projectName) => {
  spinner.start();
  return new Promise((resolve, reject) => {
    download(
      `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`,
      projectName,
      (err) => {
        if (err) {
          reject(err);
          spinner.fail("下载失败");
        } else {
          resolve();
          spinner.succeed("下载完成");
        }
      }
    );
  });
};
