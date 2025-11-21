<template>
  <div class="modal-backdrop" @click="$emit('click-outside')">
    <div class="modal-wrapper">
      <div class="modal" @click.stop>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits:['click-outside'],
  name: 'Modal',
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.modal-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  padding: 2rem;
  width: 600px;
  min-width: 200px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border: 1px solid var(--secondary);
  background: var(--hover-detail);
  margin: 1rem;
  height: fit-content;
}

@media screen and (max-width: 768px) {
  .modal {
    padding: 1rem;
    margin: 0.5rem;
    max-width: 98vw;
  }
}
</style>