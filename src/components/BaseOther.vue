<script lang="ts" setup>
import BaseText from './BaseText.vue'
import { computed } from 'vue'
const props = defineProps({ modelValue: String, text: String, max: { type: Number, default: 20 }, inputType: { type: String, default: 'text' }, autocomplete: String })
const emit = defineEmits(['update:modelValue'])

const _value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>

<template>
  <div class="base">
    {{ text }}
    <BaseText v-model="_value" v-bind="$props" />
  </div>
</template>

<style lang="scss" scoped>
.base {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>
