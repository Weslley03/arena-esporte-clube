<template>
  <div class="toast" :class="type">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType,  } from 'vue';

export default defineComponent({
  name: 'Toast',
  props: {
    message: { type: String, required: true },
    type: { type: String as PropType<'success' | 'error' | 'warning' | 'info'>, required: true },
  },
})
</script>

<style scoped>
.toast {
  z-index: 999999999999999;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  padding: 6px 15px;
  border-radius: 8px;
  color: #fff;
  min-width: 260px;

  background: #1f1f1f;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.3);

  text-align: center;
  font-size: 15px;
  letter-spacing: 0.3px;

  animation: fadeIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
}

.success { background: #14532d; }
.error { background: #7f1d1d; }
.warning { background: #a16207; }
.info { background: #1e3a8a; }

@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -10px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes fadeOut {
  to { opacity: 0; transform: translate(-50%, -10px); }
}
</style>
