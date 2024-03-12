import _Grids from './grids.vue';
import _Grid from './grid.vue';
import { withInstall } from '../utils';

export const Grids = withInstall(_Grids);
export const Grid = withInstall(_Grid);
Grids.Grid = Grid;
export default Grids;
