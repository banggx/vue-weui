import _Calendar from './calendar.vue';
import _CalendarPicker from './calendarPicker.vue';
import { withInstall } from '../utils';
import { useSwipe } from './composables/useSwipe';
import { useLockScroll } from './composables/useLockScroll';

// Import styles
import './calendar.less';

export const Calendar = withInstall(_Calendar);
export const CalendarPicker = withInstall(_CalendarPicker);

export { useSwipe, useLockScroll };
export default Calendar;
