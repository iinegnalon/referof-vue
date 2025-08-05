<script lang="ts" setup>
import { Field, useField } from 'vee-validate';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseRadioGroup from '@/components/common/BaseRadioGroup.vue';
import BaseCheckboxGroup from '@/components/common/BaseCheckboxGroup.vue';
import BaseDateTimePicker from '@/components/common/BaseDateTimePicker.vue';
import { ref } from 'vue';

const dateOptions = [
  {
    value: 'noEndDate',
    label: 'Без даты конца',
  },
];
const sendOptions = [
  {
    label: 'Создать промокод без отправки',
    value: 'noSend',
  },
  {
    label: 'Отправить промокод всем пользователям',
    value: 'sendAll',
  },
];

const { value: endDate } = useField<Date | null>('endDate');
const { value: hasNoEndDate } = useField<boolean | null>('hasNoEndDate');

const hasNoEndDateCheckbox = ref<string[]>([]);

function handleNoEndDate() {
  hasNoEndDate.value = hasNoEndDateCheckbox.value.includes('noEndDate');

  if (hasNoEndDate.value) {
    endDate.value = null;
  }
}
</script>

<template>
  <div class="promo-code-step-two">
    <div class="promo-code-step-two__group">
      <span class="b2-m">
        Срок действия промокода<span class="color-text-error">*</span>
      </span>

      <div class="promo-code-step-two__row">
        <!--Start date-->
        <Field v-slot="{ field, errorMessage }" name="startDate">
          <BaseDateTimePicker
            :error="errorMessage"
            label="Дата начала"
            required
            v-bind="field"
          />
        </Field>

        <!--End date-->
        <Field
          v-if="!hasNoEndDate"
          v-slot="{ field, errorMessage }"
          name="endDate"
        >
          <BaseDateTimePicker
            :error="errorMessage"
            label="Дата конца"
            v-bind="field"
          />
        </Field>
      </div>

      <!--No end date checkbox-->
      <BaseCheckboxGroup
        v-model="hasNoEndDateCheckbox"
        :options="dateOptions"
        @change="handleNoEndDate"
      />
    </div>

    <hr />

    <div class="promo-code-step-two__group">
      <!--Activations limit-->
      <Field v-slot="{ field, errorMessage }" name="activationsLimit">
        <BaseInput
          :error="errorMessage"
          label="Введите лимит активаций (шт.)"
          placeholder="1000"
          required
          type="number"
          v-bind="field"
        />
      </Field>
    </div>

    <div class="promo-code-step-two__group">
      <span class="b2-m">
        Настроить получение промокода<span class="color-text-error">*</span>
      </span>

      <!--Send mode-->
      <Field v-slot="{ field, errorMessage }" name="sendMode">
        <BaseRadioGroup
          :error="errorMessage"
          :options="sendOptions"
          label="Настройка получения промокода"
          v-bind="field"
        />
      </Field>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.promo-code-step-two {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media screen and (min-width: $breakpoint-tablet) {
      flex-direction: row;
      justify-content: space-between;
      gap: 20px;
    }
  }

  .datetime-picker {
    width: 100%;

    @media screen and (min-width: $breakpoint-tablet) {
      width: 50%;
    }

    :deep(.datetime-picker__box--date) {
      max-width: 100%;
    }
  }

  hr {
    margin: 0;
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid $color-stroke-1;
    padding: 0;
  }
}
</style>
