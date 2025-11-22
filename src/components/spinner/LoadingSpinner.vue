<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name:'LoadingSpinner',
})
</script>

<style scoped>
.spinner-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
}

.spinner {
  position: relative;
  border: 2px solid var(--gray-200);
  border-top: 2px solid var(--secondary);
  border-radius: 50%;
  width: 21px;
  height: 21px;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
