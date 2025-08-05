<script lang="ts" setup>
import { ref, watch } from 'vue';
import IconCalendar from '@/components/icons/IconCalendar.vue';

interface TimeOnly {
  hours: number;
  minutes: number;
}

const props = defineProps<{
  modelValue?: Date | null;
  label?: string;
  error?: boolean | string;
}>();

const emit = defineEmits(['update:modelValue']);

const dateOnly = ref<Date | null>(null);
const timeOnly = ref<TimeOnly | null>(null);

watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      dateOnly.value = null;
      timeOnly.value = null;
    } else {
      dateOnly.value = new Date(val);
      timeOnly.value = {
        hours: dateOnly.value.getHours(),
        minutes: dateOnly.value.getMinutes(),
      };
    }
  },
  { immediate: true },
);

function handleDateChange() {
  // Set time to 00:00 if only date is set
  if (!timeOnly.value) {
    timeOnly.value = {
      hours: 0,
      minutes: 0,
    };
  }

  updateFullDate();
}

function handleTimeChange() {
  // Set date to today if only time is set
  if (!dateOnly.value) {
    dateOnly.value = new Date();
  }

  updateFullDate();
}

function updateFullDate() {
  const d = dateOnly.value;
  const t = timeOnly.value;

  if (!d || !t) {
    emit('update:modelValue', null);
    return;
  }

  // Merge date and time into single date
  const merged = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    t.hours,
    t.minutes,
  );

  emit('update:modelValue', merged);
}
</script>

<template>
  <div :class="{ 'datetime-picker--error': error }" class="datetime-picker">
    <span v-if="label" class="datetime-picker__label">
      {{ label }}
    </span>

    <div class="datetime-picker__row">
      <div class="datetime-picker__box datetime-picker__box--date">
        <IconCalendar class="datetime-picker__icon" />
        <div class="datetime-picker__input-wrapper">
          <span class="datetime-picker__sub c2-r color-text-3">Дата</span>
          <VueDatePicker
            v-model="dateOnly"
            :clearable="false"
            :enable-time-picker="false"
            :format="'dd.MM.yyyy'"
            :teleport="true"
            :ui="{ input: 'datetime-picker__input' }"
            cancelText="Отмена"
            locale="ru"
            placeholder="дд.мм.гггг"
            selectText="Принять"
            @update:model-value="handleDateChange"
          >
            <template #input-icon />
          </VueDatePicker>
        </div>
      </div>

      <div class="datetime-picker__box datetime-picker__box--time">
        <VueDatePicker
          v-model="timeOnly"
          :clearable="false"
          :format="'HH:mm'"
          :teleport="true"
          :ui="{ input: 'datetime-picker__input' }"
          cancelText="Отмена"
          locale="ru"
          placeholder="--:--"
          selectText="Принять"
          time-picker
          @update:model-value="handleTimeChange"
        >
          <template #input-icon />
        </VueDatePicker>
      </div>
    </div>

    <div class="datetime-picker__footer">
      <div
        v-if="typeof error === 'string'"
        class="datetime-picker__error c2-r color-text-error"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.datetime-picker {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &--error {
    .datetime-picker__label {
      color: $color-text-error;
    }

    .datetime-picker__box {
      border: 1px solid $color-text-error;
    }
  }

  &__label {
    color: $color-text-4;
  }

  &__row {
    display: flex;
    gap: 4px;
  }

  &__box {
    background-color: $color-surface-3;
    border-radius: 12px;
    padding: 5px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;

    &--date {
      max-width: 140px;
    }

    &--time {
      max-width: 80px;
    }
  }

  &__input-wrapper {
    display: flex;
    flex-direction: column;
  }

  &__icon {
    width: 24px;
    height: 24px;
    color: $color-text-3;
    flex-shrink: 0;
  }

  :deep(.datetime-picker__input) {
    border: none;
    outline: none;
    background: transparent;
    font: inherit;
    padding: 0;
  }
}
</style>
