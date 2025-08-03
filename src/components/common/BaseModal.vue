<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import IconClose from '@/components/icons/IconClose.vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    showClose?: boolean;
    closeOnClickOutside?: boolean;
    contentClass?: string;
  }>(),
  {
    showClose: true,
    closeOnClickOutside: true,
  },
);

const emit = defineEmits(['update:modelValue', 'modal-close']);

function emitClose() {
  emit('update:modelValue', false);
}

function onOverlayClick() {
  if (props.closeOnClickOutside) {
    emitClose();
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="onOverlayClick">
      <div :class="props.contentClass" class="modal-content" role="dialog">
        <IconClose v-if="showClose" class="modal-close" @click="emitClose" />
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
