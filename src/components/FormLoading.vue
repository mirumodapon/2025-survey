<script setup lang="ts">
import { computed } from 'vue'
import BaseSwitch from './BaseSwitch.vue'

const props = defineProps({ modelValue: String, text: String })
const emit = defineEmits(['update:modelValue'])

const lang = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>

<template>
  <section class="base">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <h2 v-if="text">{{ text }}</h2>
  </section>
</template>

<style lang="scss" scoped>
.base {
  flex: 1 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 1.4rem;
}
.description {
  font-size: 1.2rem;
  text-align: start;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }

  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }

    100% {
      top: 0;
      left: 0;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
}
</style>
