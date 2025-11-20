<template>
  <div class="container">
    <span> {{ label }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'IndexColum',
  props: {
    label: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    return {}
  }
})
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  height: 3px;
  padding: 24px;
  border-radius: 10px;
  color: var(--primary);
  font-size: 20px;
  background-color: var(--secondary);
  cursor: auto;
}
</style>