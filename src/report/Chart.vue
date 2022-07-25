<script lang="ts" setup>
import Chart from 'chart.js/auto'
import { ref, onMounted, PropType, watch, onUnmounted } from 'vue'

const props = defineProps({ config: { type: Object as PropType<unknown>, required: true } })

const el = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

const getData = () => {
  // @ts-expect-error
  if (props.config.custom) {
    return {
      // @ts-expect-error
      ...props.config.data,
      // @ts-expect-error
      labels: props.config.data.labels
        // @ts-expect-error
        .slice(0, props.config.custom?.limit)
        // @ts-expect-error
        .filter((_, i) => props.config.custom?.skipZero ? props.config.data.datasets[0].data[i] > 0 : true)
      // datasets: props.config.data.datasets
      //   // @ts-expect-error
      //   .map((set) => ({
      //     ...set,
      //     data: set.data
      //       // @ts-expect-error
      //       .slice(0, props.config.custom?.limit)
      //       // @ts-expect-error
      //       .filter((d) => props.config.custom?.skipZero ? d > 0 : true)
      //   }))
    }
  }
  // @ts-expect-error
  return props.config.data
}

onMounted(() => {
  if (!el) return
  const context = el.value?.getContext('2d')
  if (!context) return
  // @ts-expect-error
  chart = new Chart(context, { type: props.config.type, data: getData(), options: props.config.options })
  console.log(getData())
})

watch(() => props.config, () => {
  if (!chart) return
  // @ts-expect-error
  chart.type = props.config.type
  chart.data = getData()
  // @ts-expect-error
  chart.options = props.config.options
  chart.update()
})

onUnmounted(() => {
  if (!chart) return
  chart.destroy()
})
</script>

<template>
  <canvas ref="el" />
</template>
