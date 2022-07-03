<script lang="ts" setup>
const props = defineProps({ modelValue: Number })
</script>

<template>
  <div class="base">
    <div class="text">Finished: {{ modelValue }}%</div>
    <div class="bar"><div class="iterator" :style="{ right: `${modelValue}%` }" /></div>
  </div>
</template>

<style lang="scss" scoped>
.base {
  .text {
    font-size: 1rem;
    text-align: end;
  }

  .bar {
    position: relative;
    border: 2px solid var(--primary-color);
    height: 6px;

    .iterator {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: var(--primary-color);
    }
  }
}
</style>
