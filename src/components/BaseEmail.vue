<script lang="ts" setup>
import { computed } from 'vue'
import BaseText from './BaseText.vue'
const props = defineProps({ modelValue: { type: String, required: true }, lang: String })
const emit = defineEmits(['update:modelValue'])

const _value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const error = computed(() => {
  if (_value.value === '') return ''
  if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(_value.value)) return props.lang === 'zh' ? '錯誤的 Email 格式' : 'Invalid email format'
  const [_, domain] = _value.value.split('@')
  if (/[gmail]{4,5}/.test(domain) && domain !== 'gmail.com') {
    return 'gmail.com?'
  }
  return ''
})
</script>

<template>
  <div class="base">
    <BaseText v-model="_value" inputType="email" autocomplete="email" :max="99" />
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style lang="scss" scoped>
.base {
  position: relative;

  .error {
    position: absolute;
    left: 15px;
    bottom: 5px;
    color: red;
    font-size: 0.9rem;
  }
}
</style>
