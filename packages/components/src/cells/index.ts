import _Cells from './cells.vue';
import _Cell from './cell.vue';
import { withInstall } from 'vue-weui-utils';

type CellsType = typeof _Cells & {
  Cell: typeof _Cell;
};
export const Cells = withInstall<CellsType>(_Cells as CellsType);
export const Cell = withInstall(_Cell);
Cells.Cell = Cell;
export default Cells;
