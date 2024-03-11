import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { readFile } from 'fs/promises';
import prompts from 'prompts';
import gitClone from './gitClone.js';

const pkg = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);

// 配置命令参数
const optionDefinitions = [
  { name: 'version', alias: 'v', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean }
];
const options = commandLineArgs(optionDefinitions);
const helpSections = [
  {
    header: 'create-vue-weui',
    content: '一个快速生成vue-weui组件库开发环境的脚手架'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'version',
        alias: 'v',
        typeLabel: '{underline boolean}',
        description: '版本号'
      },
      {
        name: 'help',
        alias: 'h',
        typeLabel: '{underline boolean}',
        description: '帮助'
      }
    ]
  }
];

if (options.version) {
  console.log(`v${pkg.version}`);
}
if (options.help) {
  console.log(commandLineUsage(helpSections));
}

const promptsOptions = [
  {
    type: 'text',
    name: 'name',
    message: '请输入项目名称'
  },
  {
    type: 'select',
    name: 'template',
    message: '请选择一个模版',
    choices: [{ title: 'vue-weui', value: 1 }]
  }
];

const remoteList = {
  1: 'https://github.com/webChen725/test-vercel.git'
};
const getUserInfo = async () => {
  const res = await prompts(promptsOptions);
  if (!res.name || !res.template) {
    return;
  }
  gitClone(`direct:${remoteList[res.template]}`, res.name, {
    clone: true
  });
};

getUserInfo();
