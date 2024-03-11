import { series, parallel, src, dest } from 'gulp';
import less from 'gulp-less';
import autoPrefixer from 'gulp-autoprefixer';
import delPath from '../utils/delpath';
import { pkgPath, componentPath } from '../utils/paths';
import run from '../utils/run';

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

// 打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
