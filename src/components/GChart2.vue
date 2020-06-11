<template>
  <div class="container">
    <GChart
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';
import moment from 'moment';

export default {
  name: 'GChart2',
  components: {
    GChart
  },
  props: {
    runs: Array
  },
  data () {
    return {
      chartData: [],
      chartOptions: {
        chart: {
          title: 'Run Performance',
        },
        hAxis: { title: 'Run Date' },
        vAxis: { title: 'Mile Pace (min/mile)' },
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" }
      }
    }
  },
  methods: {
    transformData() {
      var d = [["Date", "Mile Pace (min/mile)", { role: "style" } ]];

      this.runs.slice().reverse().forEach(function(value) {
        let raw_date = value.attributes.start_date;
        let date = moment(raw_date.replace(/Z/, '')).format('M-D-YY');
        let seconds = value.attributes.mile_pace;
        let mile_pace = Math.round((seconds / 60) * 100) / 100;
        let color;

        switch(true) {
          case (mile_pace <= 7.5):
            color = '#74e6b8';
            break;
          case (mile_pace <= 7.75):
            color = '#53b685';
            break;
          case (mile_pace <= 8.0):
            color = '#357b55';
            break;
          case (mile_pace <= 8.25):
            color = '#255c57';
            break;
          default:
            color = '#153633';
        }

        d.push([date, mile_pace, color]);
      });

      return d;
    }
  },
  watch: {
    runs() {
      this.chartData = this.transformData();
    }
  }
}
</script>