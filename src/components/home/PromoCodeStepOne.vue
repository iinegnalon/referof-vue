<script lang="ts" setup>
import { Field } from 'vee-validate';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseTextarea from '@/components/common/BaseTextarea.vue';
import IconCoin from '@/components/icons/IconCoin.vue';
</script>

<template>
  <div class="promo-code-step-one">
    <Field v-slot="{ field, errorMessage }" name="promoCodeName">
      <BaseInput
        :error="errorMessage"
        :maxLength="30"
        label="Название промокода"
        placeholder="Введи название"
        required
        uppercase
        v-bind="field"
      />
    </Field>

    <Field v-slot="{ field, errorMessage }" name="title">
      <BaseInput
        :error="errorMessage"
        :maxLength="120"
        label="Заголовок"
        placeholder="Введи заголовок"
        required
        v-bind="field"
      />
    </Field>

    <Field v-slot="{ field, errorMessage }" name="additionalText">
      <BaseTextarea
        :error="errorMessage"
        :maxLength="250"
        label="Сопроводительный текст"
        placeholder="Например: «Ты попал в число счастливчиков! Дарим 300 баллов»"
        v-bind="field"
      />
    </Field>

    <Field v-slot="{ field, errorMessage }" name="points">
      <BaseInput
        :error="errorMessage"
        label="Количество баллов"
        placeholder="100"
        required
        type="number"
        v-bind="field"
      >
        <template #prefix>
          <IconCoin />
        </template>
      </BaseInput>
    </Field>
  </div>
</template>

<style lang="scss" scoped>
.promo-code-step-one {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
