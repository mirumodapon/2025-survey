<script setup lang="ts">
import { computed, PropType } from 'vue'

type Option = { text: string, value: string }

const props = defineProps({ modelValue: String, options: { type: Array as unknown as PropType<[Option,Option]>, required: true } })
const emit = defineEmits(['update:modelValue'])

const _value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const click = () => {
  _value.value = props.options[props.options[0].value === _value.value ? 1 : 0].value
}
</script>

<template>
  <div class="base">
    <label>{{ options[0].text }}</label>
    <div
      class="switch"
      @click="click"
    >
      <div :style="{ transform: _value === options[1].value ? 'translateX(40px)' : 'none' }" class="point" />
      <input type="radio" v-model="_value" :value="options[0].value" />
      <input type="radio" v-model="_value" :value="options[1].value" />
    </div>
    <label>{{ options[1].text }}</label>
  </div>
</template>

<style lang="scss" scoped>
.base {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  label {
    margin: 5px;
  }
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--accent-color);
    position: relative;
    cursor: pointer;

    .point {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 24px;
      height: 24px;
      background: var(--primary-color);
      transition: transform 0.2s ease-in-out;
    }

    input[type=radio] {
      -webkit-appearance: none;
      appearance: none;
      width: 40px;
      height: 40px;
      margin: 0;
    }
  }
}
</style>
