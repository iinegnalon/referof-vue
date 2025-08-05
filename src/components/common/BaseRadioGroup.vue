<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    options: Array<{ label: string; value: string }>;
    direction?: 'column' | 'row';
    error?: boolean | string;
  }>(),
  {
    direction: 'column',
  },
);

const emit = defineEmits(['update:modelValue', 'change']);

const inputValue = ref<string | null>(null);

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      inputValue.value = val;
    }
  },
  { immediate: true },
);

function update(value: string) {
  emit('update:modelValue', value);
  emit('change', value);
}
</script>

<template>
  <div
    :class="{
      'radio-group': true,
      'radio-group--row': props.direction === 'row',
      'radio-group--column': props.direction !== 'row',
      'radio-group--error': error,
    }"
  >
    <label
      v-for="option in options"
      :key="option.value"
      class="radio-group__item"
    >
      <span
        :class="{
          'radio-group__circle--selected': inputValue === option.value,
        }"
        class="radio-group__circle"
      />
      <input
        v-model="inputValue"
        :value="option.value"
        class="radio-group__input"
        type="radio"
        @change="() => update(option.value)"
      />
      <span class="radio-group__label">{{ option.label }}</span>
    </label>

    <div class="radio-group__footer">
      <div
        v-if="typeof error === 'string'"
        class="radio-group__error c2-r color-text-error"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.radio-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  &--column {
    flex-direction: column;
  }

  &--row {
    flex-direction: row;
  }

  &--error {
    .radio-group__circle {
      border-color: $color-text-error;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    position: relative;
  }

  &__input {
    display: none;
  }

  &__circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: relative;
    border: 2px solid $color-icon-4;
    background-color: white;
    transition: all 0.2s ease;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &--selected {
      border-color: $color-accent-primary;
      background-color: $color-accent-primary;
    }

    &--selected::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: white;
    }
  }

  &__label {
    user-select: none;
  }
}
</style>
