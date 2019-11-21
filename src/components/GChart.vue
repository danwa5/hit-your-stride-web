<template>
  <div class="container">
    <div id="gchart_div" style="width: 900px; height: 200px;"></div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Chart',
  components: {},
  methods: {
    drawChart: function() {
      var data =  google.visualization.arrayToDataTable(this.chart_data);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      // Set chart options
      var options = {
        hAxis: { title: 'Run Date' },
        vAxis: { title: 'Mile Pace (min/mile)' },
        width: 900,
        height: 200,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.ColumnChart(document.getElementById("gchart_div"));
      chart.draw(view, options);
    },

    date: function(date) {
      date = date.replace(/Z/, '');
      return moment(date).format('M-D-YYYY');
    }
  },
  props: [
    'runs'
  ],
  computed: {
    chart_data: function() {
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
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(this.drawChart);
    }
  }
}
</script>
