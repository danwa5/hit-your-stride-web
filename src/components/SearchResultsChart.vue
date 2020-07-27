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
import { format, parseISO } from 'date-fns';

export default {
  name: 'SearchResultsChart',
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
        hAxis: {
          title: 'Run Date',
          titleTextStyle: {
            italic: false
          }
        },
        vAxis: {
          title: 'Mile Pace (min/mile)',
          format: '0.0',
          viewWindow: { min: 6.5 },
          titleTextStyle: {
            fontSize: 12,
            italic: false
          }
        },
        height: 200,
        bar: { groupWidth: '95%' },
        chartArea: { width: '80%' },
        legend: { position: 'none' }
      }
    }
  },
  methods: {
    transformData() {
      var d = [['Date', 'Mile Pace (min/mile)', { role: 'style' }, { role: 'annotation' } ]];

      this.runs.slice().reverse().forEach(function(value) {
        let raw_date = value.attributes.start_date;
        let date = format(parseISO(raw_date.replace(/Z/, '')), 'M-d-yy');
        let mile_pace_seconds = value.attributes.mile_pace;
        let mile_pace = Math.round((mile_pace_seconds / 60) * 100) / 100;

        let pace_minutes = parseInt(mile_pace_seconds / 60);
        let pace_seconds = ('0' + (mile_pace_seconds % 60)).slice(-2);
        let formatted_pace = pace_minutes + ':' + pace_seconds
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

        d.push([date, mile_pace, color, formatted_pace]);
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
