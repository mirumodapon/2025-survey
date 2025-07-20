<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseSwitch from './BaseSwitch.vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const lang = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>

<template>
  <section class="base2">
    <h1>
      <template v-if="lang === 'zh'">
        COSCUP 2025 參與者大調查
      </template>
      <template v-else>
        COSCUP 2025 Attendee Survey
      </template>
    </h1>
    <ul class="description">
      <template v-if="lang === 'zh'">
        <li>送出表單即可取得 OPass 票券，透過出示 QR Code 參與大地遊戲，即可獲得點數到大會攤位兌換精美紀念品喔！</li>
        <li>每年 Stack Overflow 都會發表 <a href="https://survey.stackoverflow.co/2023/">Developer Survey</a>，讓大家了解 Stack Overflow 社群參與者的組成。身為亞洲最大開源年會，我們也要來大調查，讓大家可以一窺 COSCUP 的與會者樣貌！</li>
        <li>本次調查目的為了解 COSCUP 受眾的群體狀況，不會蒐集任何足以辨識個人的資料，請放心填寫。統計結果預計於年會進行中公開，並持續開放填寫，在年會結束後完成最後統計並公開。</li>
      </template>
      <template v-else>
        <li>Fill out the survey to get OPass ticket, use QR Code to join booth reward activity, collect points to get souvenir!</li>
        <li>Every year, Stack Overflow publishes a Developer Survey for people to get to know the Stack Overflow community. As Asia's largest open source conference, we're doing this survey to give you a glimpse of COSCUP attendees!</li>
        <li>The purpose of this survey is to understand the demographics of the COSCUP audience. We will collect no personally identifiable information. We'll release the survey results during the COSCUP, and the survey will be open for completion after the conference.</li>
      </template>
    </ul>
    <BaseSwitch v-model="lang" :options="[{ text: '中', value: 'zh' }, { text: 'En', value: 'en' }]" />
    <a href="https://coscup.org/2025-survey/report" target="_blank"><BaseButton style="margin-top: 10px" color="#25C2A5">{{ lang === 'zh' ? '查看調查結果' : 'View survey report' }}</BaseButton></a>
    <div class="branding">
      Source code: <a href="https://github.com/COSCUP/2025-survey" target="_blank"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="Github" /></a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.base2 {
  flex: 1 1;
  height: 100%;
  position: relative;
  padding-bottom: 50px;
  box-sizing: border-box;
}
h1 {
  font-size: 1.4rem;
  word-break: keep-all;
}
.description {
  font-size: 1.2rem;
  text-align: start;
}

.branding {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
