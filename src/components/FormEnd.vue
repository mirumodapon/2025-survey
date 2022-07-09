<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import BaseSwitch from './BaseSwitch.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import BaseButton from './BaseButton.vue';
import BaseText from './BaseText.vue';


const props = defineProps({ token: String, t: { type: Function as PropType<(zh: string, en: string) => string>, required: true } })

const url = computed(() => `https://opass.app/r/COSCUP_2022/${props.token}`)

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
    <p class="description">{{ t('感謝你的回答，我們將會在 COSCUP 當天公佈統計結果，盡請期待。\n以下是你的參與網址，於手機上點擊並安裝能了解議程與參與當天的現場活動。', 'Thank you for completing our survey! We will announce the result on the day of COSCUP. Please stay tuned!\nHere is the link to install the OPass app on your cell phone. You will get all the information (sessions & events) about COSCUP 2022 through the OPass app.') }}</p>
    <div class="opass">
      <img :src="`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${token}&choe=UTF-8`" />
      <a class="button" :href="url"><BaseButton color="#94E73A">{{ t('打開 OPass APP', 'Open OPass APP') }}</BaseButton></a>
      <BaseText readonly :model-value="url" @click="copy" />
      {{ copyMessage }}
    </div>
    <BaseButton color="#94E73A" @click="forget">{{ t('移除此裝置的參與憑證並重填問券', 'Remove the participation certificate from the device and refill the survey.') }}</BaseButton>
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
  color: var(--primary-color);
  text-align: center;
  display: block;
}

</style>
