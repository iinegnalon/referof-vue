<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    options: Array<{ label: string; value: string }>;
    direction?: 'column' | 'row';
    error?: boolean | string;
  }>(),
  {
    direction: 'column',
  },
);

const emit = defineEmits(['update:modelValue', 'change']);

const inputValue = ref<string[]>([]);

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      inputValue.value = val;
    }
  },
  { immediate: true },
);

function isChecked(val: string) {
  return inputValue.value.includes(val);
}

function toggle(val: string) {
  const newValue = isChecked(val)
    ? inputValue.value.filter((v) => v !== val)
    : [...inputValue.value, val];

  emit('update:modelValue', newValue);
  emit('change', newValue);
}
</script>

<template>
  <div
    :class="{
      'checkbox-group': true,
      'checkbox-group--row': props.direction === 'row',
      'checkbox-group--column': props.direction === 'column',
    }"
  >
    <label
      v-for="option in options"
      :key="option.value"
      class="checkbox-group__item"
    >
      <span
        :class="{ 'checkbox-group__box--checked': isChecked(option.value) }"
        class="checkbox-group__box"
      />
      <input
        :checked="isChecked(option.value)"
        :value="option.value"
        class="checkbox-group__input"
        type="checkbox"
        @change="() => toggle(option.value)"
      />
      <span class="checkbox-group__label">{{ option.label }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.checkbox-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  &--column {
    flex-direction: column;
  }

  &--row {
    flex-direction: row;
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

  &__box {
    width: 20px;
    height: 20px;
    border: 2px solid $color-icon-4;
    border-radius: 4px;
    background-color: white;
    transition: background-color 0.2s ease;

    &--checked {
      background-color: $color-accent-primary;
      border-color: $color-accent-primary;
      position: relative;
    }

    &--checked::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 6px;
      width: 7px;
      height: 12px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &__label {
    user-select: none;
  }
}
</style>
