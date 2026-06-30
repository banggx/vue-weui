import Calendar from './calendar.vue'
import CalendarPicker from './calendarPicker.vue'
import { useSwipe } from './composables/useSwipe'
import { useLockScroll } from './composables/useLockScroll'

// Import styles
import './calendar.less'

export { Calendar, CalendarPicker, useSwipe, useLockScroll }
export default Calendar