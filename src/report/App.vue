<script setup lang="ts">
import { ref, computed } from 'vue'
import { getDefaultFormData, makeFormConfig } from '../modules/Form'

import type ResultType from '../../public/result.json'
import { FormField, FormItem } from '../types'
import Chart from './Chart.vue'
import BaseSwitch from '../components/BaseSwitch.vue'

const getUserDefaultLang = () => {
  const userLanguage = window.navigator.language
  if (userLanguage.includes('zh')) return 'zh'
  return 'en'
}

const data = ref<typeof ResultType | null>(null)
const lang = ref<'zh' | 'en'>(getUserDefaultLang())

const t = (zh: string, en: string) => lang.value === 'zh' ? zh : en

const formConfig = computed(() => makeFormConfig(t, { captchaToken: '' }))

const current = computed(() => (data.value?.[lang.value] ?? []))

const update = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}result.json`)
  data.value = await res.json()
}

update()
setInterval(update, 2 * 60 * 1000)
</script>

<template>
  <main class="main">
    <img class="banner" src="../assets/banner.jpg" alt="COSCUP 2022 Developer Survey Report">
    <h1>COSCUP 2022 Developer Survey Report</h1>
    <p>{{ t('本資料每 5-10 分鐘更新一次，原始統計資料：', 'This data will update by 5-10 mins. Original stat data:') }}<a
        href="https://coscup.org/2022-survey/result.json" target="_blank">https://coscup.org/2022-survey/result.json</a></p>
    <BaseSwitch v-model="lang" :options="[{ text: '中', value: 'zh' }, { text: 'En', value: 'en' }]" />
    <div class="list">
      <Chart :config="item" v-for="item in current" :key="item.key + lang" />
    </div>
  </main>
</template>

<style lang="scss">
:root {
  --primary-color: #25C2A5;
  --text-color: #fff;
  --accent-color: #94E73A;
  --background-color: #282635;
}

html,
body {
  margin: 0;
  font-size: 14px;
  background-color: var(--background-color);
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  text-align: center;

  .main {
    width: min(calc(100vw - 32px), 1200px);
    margin: 0 auto;

    a {
      color: var(--primary-color);
    }

    .list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
      gap: 16px;
      margin: 16px 0;

      >section {
        border-radius: 16px;
        padding: 16px;
        border: 1px solid #343144;
        max-width: calc(100vw - 32px);
        overflow: hidden;
      }
    }
  }

  .banner {
    width: 100%;
  }
}
</style>
