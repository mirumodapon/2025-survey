<script setup lang="ts">
import { computed } from 'vue'
import BaseSwitch from './BaseSwitch.vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const lang = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>

<template>
  <section class="base">
    <h1>
      <template v-if="lang === 'zh'">
        COSCUP x KCD Taiwan 2022 參與者大調查
      </template>
      <template v-else>
        COSCUP x KCD Taiwan 2022 Survey
      </template>
    </h1>
    <ul class="description">
      <template v-if="lang === 'zh'">
        <li>每年 Stack Overflow 都會發表 <a href="https://insights.stackoverflow.com/survey/2021">Developer Survey</a>，讓大家了解 Stack Overflow 社群參與者的組成。身為亞洲最大開源年會，我們也要來大調查，讓大家可以一窺 COSCUP 的與會者樣貌！</li>
        <li>本次調查目的為了解 COSCUP 受眾的群體狀況，不會蒐集任何足以辨識個人的資料，請放心填寫。統計結果預計於年會進行中公開，並持續開放填寫，在年會結束後完成最後統計並公開。</li>
      </template>
      <template v-else>
        <li>Every year, Stack Overflow publishes a Developer Survey for people to get to know the Stack Overflow community. As Asia's largest open source conference, we're doing this survey to give you a glimpse of COSCUP attendees!</li>
      <li>The purpose of this survey is to understand the demographics of the COSCUP audience. We will collect no personally identifiable information. We'll release the survey results during the COSCUP, and the survey will be open for completion after the conference.</li>
      </template>
    </ul>
    <BaseSwitch v-model="lang" :options="[{ text: '中', value: 'zh' }, { text: 'En', value: 'en' }]" />
  </section>
</template>

<style lang="scss" scoped>
.base {
  flex: 1 1;
}
h1 {
  font-size: 1.4rem;
  word-break: keep-all;
}
.description {
  font-size: 1.2rem;
  text-align: start;
}
</style>
