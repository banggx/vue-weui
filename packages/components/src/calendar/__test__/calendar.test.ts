import { describe, expect, it, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Calendar from '../calendar.vue';
import dayjs from 'dayjs';

// Mock the useSwipe composable since it uses touch events
vi.mock('../composables/useSwipe', () => ({
  useSwipe: vi.fn()
}));

// Mock the useLockScroll composable
vi.mock('../utils/useLockScroll', () => ({
  useLockScroll: vi.fn().mockReturnValue({
    lockScroll: vi.fn(),
    unlockScroll: vi.fn()
  })
}));

// Mock document.querySelector to avoid DOM errors in tests
vi.mock('document', () => ({
  querySelector: vi.fn()
}));

// Mock window.addEventListener and removeEventListener
vi.mock('window', () => ({
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
}));

// Mock dayjs for consistent date handling
const mockToday = dayjs('2023-06-15');
vi.mock('dayjs', () => ({
  default: vi.fn().mockImplementation((date) => {
    if (date === undefined) return mockToday;
    return dayjs(date);
  }),
  __esModule: true
}));

// Helper function to create a date string for testing
const createDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day);
};

// Helper function to get calendar days element
const getCalendarDaysElement = (wrapper: any) => {
  return wrapper.find('.weui-calendar-days');
};

// Helper function to find date cells
const findDateCell = (wrapper: any, date: Date) => {
  const dateString = dayjs(date).format('YYYY-MM-DD');
  // Find the cell containing the date number
  const cells = wrapper.findAll('.weui-calendar-day');
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const text = cell.text();
    if (text === date.getDate().toString()) {
      // Check if this cell corresponds to the correct date by checking data attributes or context
      // Since we can't easily check the actual date in the cell, we'll use index-based approach
      // For simplicity in tests, we'll assume the first non-empty cell is the 1st of month
      return cell;
    }
  }
  return null;
};

// Helper function to click a date cell
const clickDateCell = async (wrapper: any, date: Date) => {
  const cell = findDateCell(wrapper, date);
  if (cell) {
    await cell.trigger('click');
    await nextTick();
  }
};

// Helper function to trigger confirm button
const clickConfirmButton = async (wrapper: any) => {
  const confirmBtn = wrapper.find('.weui-calendar-action-confirm');
  if (confirmBtn.exists()) {
    await confirmBtn.trigger('click');
    await nextTick();
  }
};

// Helper function to trigger clear button
const clickClearButton = async (wrapper: any) => {
  const clearBtn = wrapper.find('.weui-calendar-action-clear');
  if (clearBtn.exists()) {
    await clearBtn.trigger('click');
    await nextTick();
  }
};

// Helper function to trigger month navigation
const clickPrevMonth = async (wrapper: any) => {
  const prevBtn = wrapper.find('.weui-calendar-prev');
  if (prevBtn.exists()) {
    await prevBtn.trigger('click');
    await nextTick();
  }
};

const clickNextMonth = async (wrapper: any) => {
  const nextBtn = wrapper.find('.weui-calendar-next');
  if (nextBtn.exists()) {
    await nextBtn.trigger('click');
    await nextTick();
  }
};

describe('weui-calendar', () => {
  // Test 1: Initial rendering
  it('should render calendar component correctly', async () => {
    const wrapper = mount(Calendar, {
      props: {
        show: true,
        modelValue: null
      }
    });
    
    // Check if calendar popup is visible
    expect(wrapper.find('.weui-calendar-popup').exists()).toBe(true);
    expect(wrapper.find('.weui-calendar-popup-content-active').exists()).toBe(true);
    
    // Check if calendar header exists
    expect(wrapper.find('.weui-calendar-header').exists()).toBe(true);
    
    // Check if weekdays are rendered
    expect(wrapper.findAll('.weui-calendar-weekday').length).toBe(7);
    
    // Check if calendar days container exists
    expect(wrapper.find('.weui-calendar-days').exists()).toBe(true);
    
    // Check if action buttons exist when showActions is true
    expect(wrapper.find('.weui-calendar-actions').exists()).toBe(false); // default showActions is false
    
    wrapper.unmount();
  });

  // Test 2: Single selection flow
  it('should handle single date selection flow', async () => {
    const wrapper = mount(Calendar, {
      props: {
        show: true,
        modelValue: null,
        mode: 'single'
      }
    });
    
    // Select a date (e.g., 15th of current month)
    const testDate = createDate(2023, 6, 15);
    await clickDateCell(wrapper, testDate);
    
    // Check that select event was emitted
    expect(wrapper.emitted('select')).toBeDefined();
    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    
    // Confirm selection
    await clickConfirmButton(wrapper);
    
    // Check that confirm event was emitted
    expect(wrapper.emitted('confirm')).toBeDefined();
    expect(wrapper.emitted('change')).toBeDefined();
    
    wrapper.unmount();
  });

  // Test 3: Range selection flow
  it('should handle range selection flow', async () => {
    const wrapper = mount(Calendar, {
      props: {
        show: true,
        modelValue: null,
        mode: 'range'
      }
    });
    
    // Select start date
    const startDate = createDate(2023, 6, 10);
    await clickDateCell(wrapper, startDate);
    
    // Check that select event was emitted with partial range
    expect(wrapper.emitted('select')).toBeDefined();
    
    // Select end date
    const endDate = createDate(2023, 6, 20);
    await clickDateCell(wrapper, endDate);
    
    // Check that select event was emitted with complete range
    expect(wrapper.emitted('select')).toBeDefined();
    
    // Confirm selection
    await clickConfirmButton(wrapper);
    
    // Check that confirm event was emitted with range
    expect(wrapper.emitted('confirm')).toBeDefined();
    expect(wrapper.emitted('change')).toBeDefined();
    
    wrapper.unmount();
  });

  // Test 4: Disabled dates should not respond to clicks
  it('should not respond to clicks on disabled dates', async () => {
    const wrapper = mount(Calendar, {
      props: {
        show: true,
        modelValue: null,
        minDate: createDate(2023, 6, 15),
        maxDate: createDate(2023, 6, 25),
        mode: 'single'
      }
    });
    
    // Try to select a date before minDate
    const beforeMinDate = createDate(2023, 6, 10);
    await clickDateCell(wrapper, beforeMinDate);
    
    // Should not emit select event
    expect(wrapper.emitted('select')).toBeUndefined();
    
    // Try to select a date after maxDate
    const afterMaxDate = createDate(2023, 6, 30);
    await clickDateCell(wrapper, afterMaxDate);
    
    // Should not emit select event
    expect(wrapper.emitted('select')).toBeUndefined();
    
    wrapper.unmount();
  });

  // Test 5: Clear operation
  it('should handle clear operation', async () => {
    const wrapper = mount(Calendar, {
      props: {
        show: true,
        modelValue: createDate(2023, 6, 15),
        mode: 'single'
      }
    });
    
    // Click clear button
    await clickClearButton(wrapper);
    
    // Check that clear event was emitted
    expect(wrapper.emitted('clear')).toBeDefined();
    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    
    wrapper.unmount();
  });

  // Test 6: Month switching state persistence
  it('should maintain state when switching months', async () => {
    const wrapper = mount(Calendar, {
      props: {
        show: true,
        modelValue: createDate(2023, 6, 15),
        mode: 'single'
      }
    });
    
    // Store initial selected date
    const initialDate = wrapper.vm.selectedDate;
    
    // Switch to next month
    await clickNextMonth(wrapper);
    
    // Switch back to previous month
    await clickPrevMonth(wrapper);
    
    // Check that selected date is still the same
    expect(wrapper.vm.selectedDate).toEqual(initialDate);
    
    wrapper.unmount();
  });

  // Test 7: Show/hide functionality
  it('should handle show/hide functionality', async () => {
    const wrapper = mount(Calendar, {
      props: {
        show: false,
        modelValue: null
      }
    });
    
    // Calendar should not be visible initially
    expect(wrapper.find('.weui-calendar-popup-content-active').exists()).toBe(false);
    
    // Update show prop to true
    await wrapper.setProps({ show: true });
    
    // Calendar should be visible
    expect(wrapper.find('.weui-calendar-popup-content-active').exists()).toBe(true);
    
    // Update show prop to false
    await wrapper.setProps({ show: false });
    
    // Calendar should not be visible
    expect(wrapper.find('.weui-calendar-popup-content-active').exists()).toBe(false);
    
    wrapper.unmount();
  });

  // Test 8: Title and custom title
  it('should display correct title', async () => {
    const wrapper = mount(Calendar, {
      props: {
        show: true,
        modelValue: null,
        title: 'Custom Title'
      }
    });
    
    // Check custom title
    expect(wrapper.find('.weui-calendar-popup-title').text()).toBe('Custom Title');
    
    // Test default title
    const defaultWrapper = mount(Calendar, {
      props: {
        show: true,
        modelValue: null
      }
    });
    
    expect(defaultWrapper.find('.weui-calendar-popup-title').text()).toBe('选择日期');
    
    defaultWrapper.unmount();
    wrapper.unmount();
  });
});