<script lang="ts" setup>
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import PromoCodeModal from '@/components/home/PromoCodeModal.vue';

const promoCodeModalOpen = ref(false);

function openModal() {
  promoCodeModalOpen.value = true;
}
</script>

<template>
  <main class="home-page">
    <div>
      <BaseButton class="form-button" @click="openModal">
        Открыть форму
      </BaseButton>
    </div>

    <PromoCodeModal v-model="promoCodeModalOpen" />
  </main>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
