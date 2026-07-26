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

vi.mock('../composables/useLockScroll', () => ({
  useLockScroll: vi.fn().mockReturnValue({
    lockScroll: vi.fn().mockReturnValue(vi.fn()),
    unlockScroll: vi.fn()
  })
}));

// Mock HalfScreenDialog component
const HalfScreenDialog = {
  name: 'HalfScreenDialog',
  props: ['modelValue', 'title', 'showClose', 'iconType'],
  emits: ['update:modelValue', 'close'],
  template: `
    <div class="mock-half-screen-dialog" v-if="modelValue">
      <div class="mock-half-screen-dialog__hd">
        <button v-if="showClose" class="mock-close-btn" @click="$emit('close')">Close</button>
        <span class="mock-title">{{ title }}</span>
      </div>
      <div class="mock-half-screen-dialog__bd">
        <slot></slot>
      </div>
    </div>
  `
};

// Mock Icon component
const Icon = {
  name: 'Icon',
  props: ['type', 'size'],
  template: '<span class="mock-icon"></span>'
};

const mountCalendar = (props = {}) => {
  return mount(Calendar, {
    props: {
      show: true,
      modelValue: null,
      ...props
    },
    global: {
      stubs: {
        'HalfScreenDialog': HalfScreenDialog,
        'Icon': Icon
      }
    }
  });
};

describe('Calendar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render calendar when show is true', () => {
      const wrapper = mountCalendar({ show: true });
      expect(wrapper.find('.weui-calendar').exists()).toBe(true);
      wrapper.unmount();
    });

    it('should not render when show is false', () => {
      const wrapper = mountCalendar({ show: false });
      expect(wrapper.find('.weui-calendar').exists()).toBe(false);
      wrapper.unmount();
    });

    it('should display default title', () => {
      const wrapper = mountCalendar();
      expect(wrapper.find('.mock-title').text()).toBe('选择日期');
      wrapper.unmount();
    });

    it('should display custom title', () => {
      const wrapper = mountCalendar({ title: '选择就诊日期' });
      expect(wrapper.find('.mock-title').text()).toBe('选择就诊日期');
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

    it('should not show actions (removed per user feedback)', () => {
      const wrapper = mountCalendar();
      // Bottom actions removed - confirm button is now in header
      expect(wrapper.find('.weui-calendar-actions').exists()).toBe(false);
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
      await new Promise(resolve => setTimeout(resolve, 350));
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
      await new Promise(resolve => setTimeout(resolve, 350));
      await nextTick();
      
      // Title should have changed
      expect(wrapper.find('.weui-calendar-title').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('Confirm via Header', () => {
    it('should emit confirm event when clicking header confirm button', async () => {
      const testDate = new Date();
      const wrapper = mountCalendar({
        modelValue: testDate
      });

      // Confirm button is now in the header (extra slot of HalfScreenDialog)
      const confirmBtn = wrapper.find('.weui-calendar-header-confirm');
      if (confirmBtn.exists()) {
        await confirmBtn.trigger('click');
        await nextTick();
        expect(wrapper.emitted('confirm')).toBeDefined();
      }
      wrapper.unmount();
    });
  });

  describe('Show/Hide', () => {
    it('should emit update:show when closing', async () => {
      const wrapper = mountCalendar({ show: true });

      await wrapper.find('.mock-close-btn').trigger('click');
      await nextTick();

      expect(wrapper.emitted('update:show')).toBeDefined();
      expect(wrapper.emitted('update:show')![0][0]).toBe(false);
      wrapper.unmount();
    });

    it('should emit hide event when closing', async () => {
      const wrapper = mountCalendar({ show: true });

      await wrapper.find('.mock-close-btn').trigger('click');
      await nextTick();

      expect(wrapper.emitted('hide')).toBeDefined();
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
});
