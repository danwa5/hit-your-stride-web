<template>
  <div class="runs">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Distance (miles)</th>
          <th>Time (h:mm:ss)</th>
          <th>Pace (min/mile)</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="run in runs" v-bind:key="run.id">
          <td>{{ date(run.data.attributes.start_date) }}</td>
          <td>{{ miles(run.data.attributes.distance) }}</td>
          <td>{{ time(run.data.attributes.moving_time) }}</td>
          <td>{{ pace(run.data.attributes.moving_time, run.data.attributes.distance) }}</td>
          <td>{{ location(run.data.attributes) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Runs',
  data() {
    return {
      runs: []
    }
  },
  methods: {
    date: function(date) {
      date = date.replace(/Z/, '');
      return moment(date).format('M-D-YYYY h:mma');
    },
    location: function(attrs) {
      return attrs.city + ', ' + attrs.state_province + ', ' + attrs.country;
    },
    miles: function(meters) {
      return (meters * 0.00062137).toFixed(2);
    },
    pace: function(seconds, meters) {
      let min_per_mile = seconds / (meters * 60 * 0.00062137);
      let min = Math.floor(min_per_mile);
      let fractional = min_per_mile - min;
      let sec = Math.round(fractional * 60).toString().padStart(2, '0');
      return min + ':' + sec;
    },
    time: function(seconds) {
      let min = Math.floor(seconds / 60);
      let hr = Math.floor(min / 60);
      min = (min % 60).toString().padStart(2, '0');
      let sec = (seconds % 60).toString().padStart(2, '0');
      let time = min + ':' + sec;
      if (hr > 0) {
        time = hr + ':' + time;
      }
      return time;
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/activities')
      .then(response => {
        this.runs = response.data
      })
  }
}
</script>
