<template>
  <section :id="config.key">
    <h2 ref="chart-wrapper"><a class="question-link" :href="`#${config.key}`">#</a> {{ config.question }}</h2>
    <div :style="`height: ${height}`">
      <apexchart
        v-if="config && showChart"
        width="100%" :height="height"
        :options="chartOptions"
        :series="series" />
    </div>
  </section>
</template>
<script>
export default {
  props: ['config'],
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
    chartData () {
      const { labels, datas } = this.config.data;

      var poll = []
      datas.map((x, i) => {
        if (labels[i] !== '無資料') {
          poll.push({y: x, x: labels[i]})
        }
      })
      return poll.filter((d) => d.y >= 1)
    },
    series() {
      if (this.config) {
        if (this.config.type == 'bar') {
          return [{
            name: this.config.question,
            data: this.chartData
          }]
        }
        if (this.config.type == 'pie') {
          return this.chartData.map((d) => d.y)
        }
      }
      return null
    },
    chartOptions() {
      if (this.config) {
        let result = {
          colors: [
            '#33B2DF', '#D4526E', '#13D8AA', '#5800FF',
            '#A5978B', '#4ECDC4', '#C7F464', '#81D4FA',
            '#546E7A', '#FD6A6A', '#F5C7A9', '#D1512D',
            '#411530', '#FF8FB1', '#FFC107', '#FFEB3B'
          ],
          chart: {
            id: `chart_${this.config.key}`,
            type: this.config.type,
            background: 'transparent',
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
              distributed: true,
            },
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
          legend: {
            position: 'top'
          },
          xaxis: {
            categories: this.chartData.map((d) => d.x)
          },
          stroke: {
            show: false
          }
        }
        if (this.config.type == 'bar') {
          result.legend.show = false;
        }
        if (this.config.type == 'pie') {
          result.labels = this.chartData.map((d) => d.x)
        }
        return result
      }
      return null
    },
    height() {
      if (this.config) {
        if (this.config.type == 'bar') {
          return `${this.chartData.length * 24 + 100}px`
        }
        if (this.config.type == 'pie') {
          return `512px`
        }
      }
      return 'auto'
    }
  }

}
</script>
