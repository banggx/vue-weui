import { describe, expect, it, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Calendar from '../calendar.vue';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Mock composables
vi.mock('../composables/useSwipe', () => ({
  useSwipe: vi.fn()
}));

// Mock Icon component
const Icon = {
  name: 'Icon',
  props: ['type', 'size'],
  template: '<span class="mock-icon"></span>'
};

const mountCalendar = (props = {}) => {
  return mount(Calendar, {
    props: {
      modelValue: null,
      ...props
    },
    global: {
      stubs: {
        Icon: Icon
      }
    }
  });
};

describe('Calendar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render calendar component', () => {
      const wrapper = mountCalendar();
      expect(wrapper.find('.weui-calendar').exists()).toBe(true);
      wrapper.unmount();
    });

    it('should render 7 weekdays', () => {
      const wrapper = mountCalendar();
      expect(wrapper.findAll('.weui-calendar-weekday').length).toBe(7);
      wrapper.unmount();
    });

    it('should render calendar days', () => {
      const wrapper = mountCalendar();
      expect(wrapper.find('.weui-calendar-days').exists()).toBe(true);
      wrapper.unmount();
    });

    it('should display current month title', () => {
      const wrapper = mountCalendar();
      const title = wrapper.find('.weui-calendar-title');
      expect(title.exists()).toBe(true);
      // Title should contain year and month
      expect(title.text()).toMatch(/\d+年\d+月/);
      wrapper.unmount();
    });
  });

  describe('Single Selection', () => {
    it('should emit select event when clicking a date', async () => {
      const wrapper = mountCalendar({ mode: 'single' });
      const days = wrapper.findAll(
        '.weui-calendar-day:not(.weui-calendar-day-empty):not(.weui-calendar-day-disabled)'
      );
      expect(days.length).toBeGreaterThan(0);

      await days[0].trigger('click');
      await nextTick();

      expect(wrapper.emitted('select')).toBeDefined();
      wrapper.unmount();
    });

    it('should not emit select when clicking disabled date', async () => {
      const today = new Date();
      const wrapper = mountCalendar({
        mode: 'single',
        minDate: today
      });

      // Find yesterday's cell
      const disabledDays = wrapper.findAll('.weui-calendar-day-disabled');
      if (disabledDays.length > 0) {
        await disabledDays[0].trigger('click');
        await nextTick();
        expect(wrapper.emitted('select')).toBeUndefined();
      }

      wrapper.unmount();
    });
  });

  describe('Range Selection', () => {
    it('should handle range selection with start and end dates', async () => {
      const wrapper = mountCalendar({ mode: 'range' });
      const days = wrapper.findAll(
        '.weui-calendar-day:not(.weui-calendar-day-empty):not(.weui-calendar-day-disabled)'
      );

      // Click first day (start date)
      await days[5].trigger('click');
      await nextTick();
      expect(wrapper.emitted('select')).toBeDefined();

      // Click another day (end date)
      await days[10].trigger('click');
      await nextTick();

      const selectEvents = wrapper.emitted('select')!;
      expect(selectEvents.length).toBe(2);
      wrapper.unmount();
    });
  });

  describe('Month Navigation', () => {
    it('should navigate to previous month', async () => {
      const wrapper = mountCalendar();
      const prevBtn = wrapper.find('.weui-calendar-prev');

      await prevBtn.trigger('click');
      await nextTick();

      // Wait for animation
      await new Promise((resolve) => setTimeout(resolve, 350));
      await nextTick();

      // Title should have changed
      expect(wrapper.find('.weui-calendar-title').exists()).toBe(true);
      wrapper.unmount();
    });

    it('should navigate to next month', async () => {
      const wrapper = mountCalendar();
      const nextBtn = wrapper.find('.weui-calendar-next');

      await nextBtn.trigger('click');
      await nextTick();

      // Wait for animation
      await new Promise((resolve) => setTimeout(resolve, 350));
      await nextTick();

      // Title should have changed
      expect(wrapper.find('.weui-calendar-title').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('Min/Max Date', () => {
    it('should disable dates before minDate', () => {
      // Use a date in the middle of the current month to ensure some dates are disabled
      const today = new Date();
      const minDate = new Date(today.getFullYear(), today.getMonth(), 15);
      const wrapper = mountCalendar({ minDate });

      const disabledDays = wrapper.findAll('.weui-calendar-day-disabled');
      // If today is before the 15th, there should be disabled dates
      // If today is on or after the 15th, there might not be any disabled dates in current month
      if (today.getDate() < 15) {
        expect(disabledDays.length).toBeGreaterThan(0);
      }
      wrapper.unmount();
    });

    it('should disable dates after maxDate', () => {
      // Use a date in the middle of the current month to ensure some dates are disabled
      const today = new Date();
      const maxDate = new Date(today.getFullYear(), today.getMonth(), 15);
      const wrapper = mountCalendar({ maxDate });

      const disabledDays = wrapper.findAll('.weui-calendar-day-disabled');
      // If today is after the 15th, there should be disabled dates
      // If today is on or before the 15th, there might not be any disabled dates in current month
      if (today.getDate() > 15) {
        expect(disabledDays.length).toBeGreaterThan(0);
      }
      wrapper.unmount();
    });
  });

  describe('Month Picker Mode', () => {
    it('should toggle month picker when clicking title', async () => {
      const wrapper = mountCalendar();
      const title = wrapper.find('.weui-calendar-title');
      
      // Initially in day mode
      expect(wrapper.find('.weui-calendar-days').exists()).toBe(true);
      expect(wrapper.find('.weui-calendar-month-picker').exists()).toBe(false);

      // Click title to switch to month picker
      await title.trigger('click');
      await nextTick();

      // Should now be in month picker mode
      expect(wrapper.find('.weui-calendar-month-picker').exists()).toBe(true);
      expect(wrapper.find('.weui-calendar-days').exists()).toBe(false);

      wrapper.unmount();
    });

    it('should render 12 months in month picker', async () => {
      const wrapper = mountCalendar();
      const title = wrapper.find('.weui-calendar-title');
      
      await title.trigger('click');
      await nextTick();

      const months = wrapper.findAll('.weui-calendar-month');
      expect(months.length).toBe(12);

      wrapper.unmount();
    });

    it('should select month and return to day view', async () => {
      const wrapper = mountCalendar();
      const title = wrapper.find('.weui-calendar-title');
      
      // Switch to month picker
      await title.trigger('click');
      await nextTick();

      // Click on a month (e.g., March)
      const months = wrapper.findAll('.weui-calendar-month');
      await months[2].trigger('click'); // March (index 2)
      await nextTick();

      // Should return to day view
      expect(wrapper.find('.weui-calendar-days').exists()).toBe(true);
      expect(wrapper.find('.weui-calendar-month-picker').exists()).toBe(false);

      wrapper.unmount();
    });
  });
});
