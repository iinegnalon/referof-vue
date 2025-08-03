<script lang="ts" setup>
import { ref } from 'vue';
import BaseModal from '@/components/common/BaseModal.vue';

const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}
</script>

<template>
  <main class="home-page">
    <div>
      <button class="form-button" @click="openModal">Открыть форму</button>
    </div>

    <BaseModal
      v-model="isModalOpen"
      :close-on-click-outside="false"
      content-class="home-page-form-modal"
    >
      <h4>Создание промокода</h4>
      <div>Контент</div>
    </BaseModal>
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
