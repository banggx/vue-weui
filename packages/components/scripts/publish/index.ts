import { series } from 'gulp';
import run from '../utils/run';
import { pkgPath } from '../utils/paths';

export const publishComponent = async () => {
  run('release-it', `${pkgPath}/vue-weui`);
};

export default series(async () => publishComponent());
