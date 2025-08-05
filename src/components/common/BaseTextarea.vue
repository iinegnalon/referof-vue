<script lang="ts" setup>
import { type Ref, ref } from 'vue';
import BaseFieldWrapper from '@/components/common/BaseFieldWrapper.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    error?: boolean | string;
    required?: boolean;
    maxLength?: number;
    rows?: number;
    showCounter?: boolean;
  }>(),
  {
    rows: 3,
    showCounter: true,
  },
);

const emit = defineEmits(['update:modelValue']);

const inputRef: Ref<HTMLInputElement | null> = ref(null);
const textLength = ref(0);

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  let value = target?.value;

  textLength.value = value.length;

  emit('update:modelValue', value);
}
</script>

<template>
  <BaseFieldWrapper
    :id="id"
    :error="error"
    :label="label"
    :max-length="maxLength"
    :required="required"
    :show-counter="showCounter"
    :text-length="textLength"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>

    <textarea
      :id="id"
      ref="inputRef"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :value="modelValue"
      class="base-textarea__field"
      v-bind="$attrs"
      @input="updateValue"
    />
  </BaseFieldWrapper>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.base-textarea__field {
  font-size: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  width: 100%;

  &::placeholder {
    color: $color-text-2;
  }
}
</style>
