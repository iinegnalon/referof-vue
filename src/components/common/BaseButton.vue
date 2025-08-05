<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
  }>(),
  {
    variant: 'primary',
    disabled: false,
    type: 'button',
  },
);
</script>

<template>
  <button
    :class="[`base-button--${variant}`, { 'base-button--disabled': disabled }]"
    :disabled="disabled"
    :type="type"
    class="base-button"
  >
    <span class="base-button__label">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  border-radius: 12px;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  outline: none;
  border: none;
  background: none;
  width: fit-content;

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Primary
  &--primary {
    background-color: $color-accent-secondary;
    color: white;

    &:hover:not(:disabled) {
      background-color: darken($color-accent-secondary, 3%);
    }
  }

  // Secondary
  &--secondary {
    background-color: $color-surface-2;
    color: $color-text-2;

    &:hover:not(:disabled) {
      background-color: darken($color-surface-2, 3%);
    }
  }
}
</style>
