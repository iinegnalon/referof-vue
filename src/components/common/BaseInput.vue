<script lang="ts" setup>
import { onBeforeUnmount, onMounted, type Ref, ref } from 'vue';
import BaseFieldWrapper from '@/components/common/BaseFieldWrapper.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    error?: boolean | string;
    required?: boolean;
    maxLength?: number;
  }>(),
  {
    type: 'text',
  },
);

const emit = defineEmits(['update:modelValue']);

const inputRef: Ref<HTMLInputElement | null> = ref(null);

onMounted(() => {
  if (props.type === 'number' && inputRef.value) {
    inputRef.value.addEventListener('wheel', disableWheelScroll, {
      passive: false,
    });
  }
});

onBeforeUnmount(() => {
  if (props.type === 'number' && inputRef.value) {
    inputRef.value.removeEventListener('wheel', disableWheelScroll);
  }
});

function updateValue(event: Event) {
  emit('update:modelValue', event.target?.value);
}

function disableWheelScroll(event: WheelEvent) {
  event.preventDefault();
}

function handleKeydown(event: KeyboardEvent) {
  if (props.type !== 'number') {
    return;
  }

  const invalidKeys = ['e', 'E', '+', '-'];
  if (invalidKeys.includes(event.key)) {
    event.preventDefault();
  }
}
</script>

<template>
  <BaseFieldWrapper :id="id" :error="error" :label="label" :required="required">
    <template #prefix>
      <slot name="prefix" />
    </template>

    <input
      :id="id"
      ref="inputRef"
      :maxlength="type !== 'number' ? maxLength : undefined"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      class="base-input__field"
      v-bind="$attrs"
      @input="updateValue"
      @keydown="handleKeydown"
    />
  </BaseFieldWrapper>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.base-input__field {
  font-size: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  background: transparent;

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    color: $color-text-2;
  }
}
</style>
