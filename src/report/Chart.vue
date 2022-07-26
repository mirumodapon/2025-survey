<template>
  <section :id="config.key">
    <h2 ref="chart-wrapper">{{ config.question }}</h2>
    <div :style="`height: ${height}px`">
      <apexchart
        v-if="config && showChart"
        width="100%" :height="height"
        :options="chartOptions"
        :series="series" />
    </div>
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
        if (rect.top >= -100 && rect.top <= viewportHeight + 100) {
          this.showChart = true;
        }
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.checkInViewport);
    this.checkInViewport();
    setTimeout(() => {
      this.checkInViewport();
    }, 100);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkInViewport);
  },
  computed: {
    series() {
      if (this.config) {
        let { labels, datas } = this.config.data;
        if (this.config.type == 'bar') {
          let data = datas.map((x, i) => ({
            y: x,
            x: labels[i]
          }))
          return [{
            name: this.config.question,
            data
          }]
        }
        if (this.config.type == 'pie') {
          return datas
        }
      }
      return null
    },
    chartOptions() {
      if (this.config) {
        let { labels, datas } = this.config.data;
        let result = {
          chart: {
            id: `chart_${this.config.key}`,
            type: this.config.type,
            background: '#333043',
            toolbar: {
              show: false
            },
          },
          markers: {
            size: 0,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          dataLabels: {
            textAnchor: 'end',
            dropShadow: {
              enabled: false
            },
            background: {
              enabled: true,
              opacity: 0.8,
              blur: 1,
              foreColor: '#000',
            }
          },
          tooltip: {
            fillSeriesColor: false,
          },
          theme: {
            mode: 'dark',
            palette: 'palette3'
          },
          xaxis: {
            categories: labels
          },
          legend: {
            position: 'top'
          },
          stroke: {
            show: false
          }
        }
        if (this.config.type == 'pie') {
          result.labels = labels
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
