<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    options: Array<{ label: string; value: string | number }>;
    direction?: 'column' | 'row';
  }>(),
  {
    direction: 'column',
  },
);

const emit = defineEmits(['update:modelValue']);

function update(value: string | number) {
  emit('update:modelValue', value);
}
</script>

<template>
  <div
    :class="{
      'radio-group': true,
      'radio-group--row': props.direction === 'row',
      'radio-group--column': props.direction !== 'row',
    }"
  >
    <label
      v-for="option in options"
      :key="option.value"
      class="radio-group__item"
    >
      <span
        :class="{
          'radio-group__circle--selected': modelValue === option.value,
        }"
        class="radio-group__circle"
      />
      <input
        :checked="modelValue === option.value"
        :value="option.value"
        class="radio-group__input"
        type="radio"
        @change="() => update(option.value)"
      />
      <span class="radio-group__label">{{ option.label }}</span>
    </label>
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
