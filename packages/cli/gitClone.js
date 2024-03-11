import download from 'download-git-repo';
import chalk from 'chalk';
import ora from 'ora';

export default (remote, name, options) => {
  const downSpinner = ora('开始下载模版...').start();
  return new Promise((resolve, reject) => {
    download(remote, name, options, (err) => {
      if (err) {
        downSpinner.fail();
        console.log('err', chalk.red(err));
        reject(err);
        return;
      }
      downSpinner.succeed(chalk.green('模版下载成功!'));
      resolve();
    });
  });
};
