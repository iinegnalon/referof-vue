<script lang="ts" setup>
import BaseModal from '@/components/common/BaseModal.vue';
import PromoCodeStepOne from './PromoCodeStepOne.vue';
import PromoCodeStepTwo from './PromoCodeStepTwo.vue';
import { computed, ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const schema = yup.object({
  // Step 1
  promoCodeName: yup.string().required('Обязательное поле').max(30),
  title: yup.string().required('Обязательное поле').max(120),
  additionalText: yup.string().max(250),
  points: yup
    .number()
    .integer('Введите целое число')
    .required('Обязательное поле')
    .typeError('Введите целое число'),

  // Step 2
  startDate: yup.date().required('Обязательное поле'),
  hasNoEndDate: yup.boolean(),
  endDate: yup
    .date()
    // Check if no end date needed
    .when('hasNoEndDate', {
      is: (val: boolean | undefined) => !val,
      then: (schema) => schema.required('Обязательное поле'),
      otherwise: (schema) => schema.nullable().notRequired(),
    })
    // Check if end date is after start date
    .when('startDate', {
      is: (startDate: Date) => !!startDate,
      then: (schema) =>
        schema.min(
          yup.ref('startDate'),
          'Дата конца не может быть раньше даты начала',
        ),
    }),
  activationsLimit: yup
    .number()
    .integer('Введите целое число')
    .required('Обязательное поле')
    .typeError('Введите целое число'),
  sendMode: yup
    .string()
    .oneOf(['noSend', 'sendAll'], 'Выберите один из вариантов')
    .required('Выберите один из вариантов'),
});
const formContext = useForm({ validationSchema: schema });

const currentStep = ref(1);

function close() {
  isModalOpen.value = false;
  currentStep.value = 1;
}

async function goNext() {
  const { validateField } = formContext;

  // First step validation
  const results = await Promise.all([
    validateField('promoCodeName'),
    validateField('title'),
    validateField('additionalText'),
    validateField('points'),
  ]);

  const valid = results.every((r) => r.valid);

  if (valid) {
    currentStep.value = 2;
  }
}

function goBack() {
  currentStep.value = 1;
}

async function createPromoCode() {
  const { validateField } = formContext;

  // Second step validation
  const results = await Promise.all([
    validateField('startDate'),
    validateField('endDate'),
    validateField('activationsLimit'),
    validateField('sendMode'),
  ]);

  const valid = results.every((r) => r.valid);

  if (valid) {
    console.log('Итоговые данные формы: ', { ...formContext.values });
    close();
  }
}
</script>

<template>
  <BaseModal
    v-model="isModalOpen"
    :close-on-click-outside="false"
    content-class="promo-code-modal"
    @modal-close="close"
  >
    <form @submit.prevent>
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
        <PromoCodeStepOne v-show="currentStep === 1" />
        <PromoCodeStepTwo v-show="currentStep === 2" />
      </div>

      <div v-if="currentStep === 1" class="promo-code-modal__footer">
        <BaseButton variant="secondary" @click="close">Отмена</BaseButton>
        <BaseButton @click="goNext"> Далее</BaseButton>
      </div>

      <div v-else class="promo-code-modal__footer">
        <BaseButton variant="secondary" @click="goBack">Назад</BaseButton>
        <BaseButton @click="createPromoCode"> Создать</BaseButton>
      </div>
    </form>
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
