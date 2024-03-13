import { series, parallel, src, dest } from 'gulp';
import less from 'gulp-less';
import autoPrefixer from 'gulp-autoprefixer';
import fse from 'fs-extra';
import path from 'path';
import delPath from '../utils/delpath';
import { pkgPath, componentPath, rootPath } from '../utils/paths';
import run from '../utils/run';
import { toPascalCase } from '../utils/tools';

// 删除打包目录
export const removeDist = () => {
  return delPath(`${pkgPath}/vue-weui`);
};

// 打包样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/*.less`)
    .pipe(less())
    .pipe(autoPrefixer())
    .pipe(dest(`${pkgPath}/vue-weui/lib/src`))
    .pipe(dest(`${pkgPath}/vue-weui/es/src`));
};

// 生成volar类型提示文件
export const buildVolarTs = () => {
  const sourcePath = path.resolve(componentPath, 'src');
  const components = fse
    .readdirSync(sourcePath)
    .filter(
      (dir: string) =>
        !dir.startsWith('.') &&
        fse.statSync(path.resolve(sourcePath, dir)).isDirectory()
    )
    .reduce<string[]>((components: string[], dir: string) => {
      const files = fse.readdirSync(path.resolve(sourcePath, dir));
      const componentsFile = files
        .filter((file: string) => file.endsWith('.vue'))
        .map((file: string) => toPascalCase(file.replace('.vue', '')));
      components.push(...componentsFile);
      return components;
    }, []);
  const volarGlobalTs = `declare module '@vue/runtime-core' {\n\texport interface GlobalComponents {\n${components
    .map((comp: string) => {
      return `\t\tweui${comp}: typeof import('vue-weui-next')['${comp}'];`;
    })
    .join('\n')}\n\t}\n}\nexport {};`;
  const volarGlobalDir = path.resolve(pkgPath, 'vue-weui/typings');
  fse.ensureDirSync(volarGlobalDir);
  fse.emptyDirSync(volarGlobalDir);
  fse.writeFileSync(path.resolve(volarGlobalDir, 'global.d.ts'), volarGlobalTs);
};

export const moveToReadme = () => {
  const targetPath = path.resolve(pkgPath, 'vue-weui');
  fse.copyFileSync(
    path.resolve(rootPath, 'README.md'),
    path.resolve(targetPath, 'README.md')
  );
  fse.copyFileSync(
    path.resolve(rootPath, 'README_ZH.md'),
    path.resolve(targetPath, 'README_ZH.md')
  );
};

// 打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent(),
    async () => buildVolarTs(),
    async () => moveToReadme()
  )
);
