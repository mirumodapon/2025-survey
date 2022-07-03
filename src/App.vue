<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './components/BaseButton.vue'
import BaseCheckbox from './components/BaseCheckbox.vue'
import BaseRadio from './components/BaseRadio.vue'
import BaseProgress from './components/BaseProgress.vue';
import BaseText from './components/BaseText.vue';
import BaseTextarea from './components/BaseTextarea.vue';
import BaseField from './components/BaseField.vue';

const testCheckbox = ref([])
const testBool = ref(false)
const testAB = ref('A')
const testText = ref('')
const testField = ref(null)

const q1 = '以下哪項最能形容你？請選擇所有適用的選項。\nWhich of the following describe you, if any? Please check all that apply.'

</script>

<template>
  <div>
    <h1>COSCUP 2022 Developer Survey</h1>
    <BaseField v-model="testField" required :question="q1" :config="{ type: 'multi-option', maxChosen: 3, options: Array(20).fill(0).map((_, i) => ({ text: String.fromCharCode(65 + i), value: i.toString() })) }">
    </BaseField>
    <!-- <BaseCheckbox v-model="testCheckbox" style="width: 200px" value="JavaScript">JavaScript</BaseCheckbox>
    <BaseCheckbox v-model="testCheckbox" style="width: 200px" value="TypeScript">TypeScript</BaseCheckbox>
    <BaseCheckbox v-model="testBool" style="width: 200px">I allow ...</BaseCheckbox>
    <BaseRadio v-model="testAB" style="width: 200px" value="A">A</BaseRadio>
    <BaseRadio v-model="testAB" style="width: 200px" value="B">B</BaseRadio>
    <BaseText v-model="testText" />
    <BaseTextarea v-model="testText" /> -->
    <BaseProgress :model-value="50" />
    <BaseButton>Next >></BaseButton>
  </div>
</template>

<style>
:root {
  --primary-color: rgb(239, 78, 136);
}

body {
  font-size: 10px;
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  text-align: center;
}
</style>
