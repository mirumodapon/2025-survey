<template>
  <section :id="config.key" :height="height">
    <h2 ref="chart-wrapper">{{ config.question }}</h2>
    <apexchart
      v-if="config && showChart"
      width="100%" :height="height"
      :options="chartOptions"
      :series="series" />
  </section>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  props: ['config'],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return ({
      showChart: false,
    })
  },
  methods: {
    // show chart only when in viewport
    checkInViewport() {
      if (this.showChart) {
        return;
      }
      const el = this.$refs['chart-wrapper'];
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top >= 0 && rect.bottom <= viewportHeight) {
          this.showChart = true;
        }
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.checkInViewport);
    this.checkInViewport();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkInViewport);
  },
  computed: {
    series() {
      if (this.config) {
        if (this.config.type == 'bar') {
          let datasets;
          if (typeof this.config.data.datasets.data == 'array') {
            datasets = this.config.data.datasets
          } else {
            datasets = this.config.data.datasets[0]
          }
          let numbers = datasets.data
          let fillColors = datasets.backgroundColor
          let labels = this.config.data.labels
          let data = numbers.map((x, i) => ({
            y: x,
            x: labels[i],
            fillColor: fillColors[i]
          }))
          return [{
            name: this.config.question,
            data
          }]
        }
        if (this.config.type == 'pie') {
          return this.config.data.datasets[0].data
        }
      }
      return null
    },
    chartOptions() {
      if (this.config) {
        let datasets;
        if (typeof this.config.data.datasets.data == 'array') {
          datasets = this.config.data.datasets
        } else {
          datasets = this.config.data.datasets[0]
        }
        let result = {
          chart: {
            id: `chart_${this.config.key}`,
            type: this.config.type,
            background: '#282635',
            toolbar: {
              show: false
            },
          },
          colors: datasets.backgroundColor,
          markers: {
            size: 0,
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          theme: {
            mode: 'dark',
            palette: 'palette3'
          },
          xaxis: {
            categories: this.config.data.labels
          },
          legend: {
            position: 'top'
          },
          stroke: {
            show: false
          }
        }
        if (this.config.type == 'bar') {
          result.chart.height = this.config.data.labels.length * 30 + 100
          console.log(result.chart.height)
        }
        if (this.config.type == 'pie') {
          result.labels = this.config.data.labels
        }
        return result
      }
      return null
    },
    height() {
      if (this.config) {
        if (this.config.type == 'bar') {
          return this.config.data.labels.length * 24 + 100
        }
      }
      return 'auto'
    }
  }

}
</script>
