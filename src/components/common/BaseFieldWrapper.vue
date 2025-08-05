<script lang="ts" setup>
defineProps<{
  label?: string;
  error?: boolean | string;
  required?: boolean;
  showCounter?: boolean;
  textLength?: number;
  maxLength?: number;
}>();
</script>

<template>
  <div>
    <label
      :class="{ 'base-field-wrapper--error': !!error }"
      class="base-field-wrapper b2-m"
    >
      <span v-if="label" class="base-field-wrapper__label">
        {{ label
        }}<span v-if="required" class="base-field-wrapper__required">*</span>
      </span>

      <span class="base-field-wrapper__wrapper">
        <slot name="prefix" />
        <slot />
      </span>
    </label>

    <div class="base-field-wrapper__footer">
      <div
        v-if="typeof error === 'string'"
        class="base-field-wrapper__error c2-r"
      >
        {{ error }}
      </div>
      <div
        v-if="showCounter && maxLength"
        :class="{ 'base-field-wrapper__error': typeof error === 'string' }"
        class="base-field-wrapper__counter c2-r"
      >
        {{ textLength }}/{{ maxLength }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.base-field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__wrapper {
    outline: none;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 10px 12px;
    background-color: $color-surface-3;
    cursor: text;
    transition: 0.3s ease;
    display: flex;
    gap: 8px;
  }

  &:focus-within {
    .base-field-wrapper__wrapper {
      border-color: $color-accent-primary;
    }
  }

  &--error {
    .base-field-wrapper__wrapper {
      border-color: $color-text-error;
    }

    &:focus-within {
      .base-field-wrapper__wrapper {
        border-color: $color-text-error;
      }
    }
  }

  &__required {
    color: $color-text-error;
  }

  &__footer {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__counter {
    margin-left: auto;
    color: $color-text-3;
  }

  &__error {
    color: $color-text-error;
  }
}
</style>
