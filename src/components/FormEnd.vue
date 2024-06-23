<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import BaseSwitch from './BaseSwitch.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import BaseButton from './BaseButton.vue';
import BaseText from './BaseText.vue';


const props = defineProps({ token: String, t: { type: Function as PropType<(zh: string, en: string) => string>, required: true } })

const url = computed(() => `https://opass.app/r/COSCUP_2024/${props.token}`)

const copyMessage = ref('')
const copy = async () => {
  await navigator.clipboard.writeText(url.value)
  copyMessage.value = props.t('複製成功，請傳到智慧型手機並打開。', 'Copy success, Please send and open in your smartphone.')
  setTimeout(() => copyMessage.value = '', 1000)
}

const forget = () => {
  window.localStorage.removeItem('ccip_token')
  window.location.reload()
}

</script>

<template>
  <section class="base">
    <p class="description">{{ t('感謝你的回答，我們將會在 COSCUP 當天公佈統計結果，盡請期待。\n您可以透過以下網址安裝並登入 OPass，透過 App 參與大地遊戲及接收議程及公告等年會第一手資訊。', 'Thank you for completing our survey! We will announce the result on the day of COSCUP. Please stay tuned!\nHere is the link to install the OPass app on your phone. You can join booth reward activity and get all the information (sessions & events) about COSCUP 2024 through the OPass app.') }}</p>
    <p class="description">{{ t('填 Attendee Survey, 抽 IntelliJ IDEA 一年期軟體授權! 由此去', 'Fill out the Attendee Survey for a chance to win a one-year software license for IntelliJ IDEA! Click here to participate.') }} <a href="https://i.coscup.org/coscup-2023-survey-prize">https://i.coscup.org/coscup-2023-survey-prize</a></p>
    <div class="opass">
      <img :src="`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${url}&choe=UTF-8`" />
      <a class="button" :href="url"><BaseButton color="#94E73A">{{ t('打開 OPass APP', 'Open OPass APP') }}</BaseButton></a>
      <BaseText readonly :model-value="url" @click="copy" />
      {{ copyMessage }}
    </div>
    <BaseButton color="#94E73A" @click="forget">{{ t('移除此裝置的參與憑證並重填問卷', 'Remove the participation certificate from the device and refill the survey.') }}</BaseButton>
  </section>
</template>

<style lang="scss" scoped>
.base {
  flex: 1 1;
}
h1 {
  font-size: 1.4rem;
}
.description {
  padding: 12px;
  white-space: pre-line;
  font-size: 1.3rem;
}

.opass {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 70%;
    max-width: 500px;
  }

  >* {
    margin: 10px;
  }
}

a {
  text-align: center;
  display: block;
}
</style>
