<script lang="ts" setup>
import BaseModal from '@/components/common/BaseModal.vue';
import PromoCodeStepOne from './PromoCodeStepOne.vue';
import PromoCodeStepTwo from './PromoCodeStepTwo.vue';
import { computed, ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const currentStep = ref(1);

function goNext() {
  currentStep.value = 2;
}

function goBack() {
  currentStep.value = 1;
}

function close() {
  isModalOpen.value = false;
  currentStep.value = 1;
}

function createPromoCode() {
  close();
}
</script>

<template>
  <BaseModal
    v-model="isModalOpen"
    :close-on-click-outside="false"
    content-class="promo-code-modal"
    @modal-close="close"
  >
    <div class="promo-code-modal__header">
      <h4 class="promo-code-modal__title">Создание промокода</h4>
      <div class="promo-code-modal__steps">
        <span :class="{ active: currentStep === 1 }"> Шаг 1: Основное </span>
        <span :class="{ active: currentStep === 2 }">
          Шаг 2: Настройки промокода
        </span>
      </div>
    </div>

    <div class="promo-code-modal__body">
      <PromoCodeStepOne v-if="currentStep === 1" />
      <PromoCodeStepTwo v-else />
    </div>

    <div v-if="currentStep === 1" class="promo-code-modal__footer">
      <BaseButton variant="secondary" @click="close">Отмена</BaseButton>
      <BaseButton @click="goNext">Далее</BaseButton>
    </div>

    <div v-else class="promo-code-modal__footer">
      <BaseButton variant="secondary" @click="goBack">Назад</BaseButton>
      <BaseButton @click="createPromoCode">Создать</BaseButton>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.promo-code-modal {
  &__header {
    margin-bottom: 20px;
  }

  &__title {
    margin-bottom: 16px;
  }

  &__steps {
    display: flex;

    span {
      flex: 1;
      color: $color-text-2;
      text-align: center;
      border-bottom: 1px solid $color-text-2;
      padding-bottom: 8px;

      &.active {
        color: $color-accent-primary;
        border-color: $color-accent-primary;
        border-width: 2px;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;

    button {
      flex: 1;
    }
  }
}
</style>
