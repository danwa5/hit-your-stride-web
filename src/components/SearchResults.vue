<template>
  <div class="container mb-3">
    <ul v-if="errors && errors.length">
      <li v-for="(error, index) in errors" v-bind:key="index">
        {{ error.message }}
      </li>
    </ul>

    <div class="d-flex mb-3">
      <div class="mr-auto">
        <h3>Search Results for "{{ reformattedSearchString }}"</h3>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Distance<br/>(miles)</th>
          <th>Time<br/>(h:mm:ss)</th>
          <th>Pace<br/>(min/mile)</th>
          <th>Layoff<br/>(days)</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="run in runs" v-bind:key="run.id">
          <td>{{ date(run.attributes.start_date) }}</td>
          <td>{{ miles(run.attributes.distance) }}</td>
          <td>{{ time(run.attributes.moving_time) }}</td>
          <td>{{ pace(run.attributes.mile_pace)}}</td>
          <td v-text="run.attributes.layoff"></td>
          <td>{{ location(run.attributes) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'SearchResults',
  components: {},
  data() {
    return {
      title: 'Search Results',
      displayMode: 'grid',
    };
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

    pace: function(seconds) {
      let minutes = Math.floor(seconds / 60);
      let fractional = (seconds % 60).toString().padStart(2, '0');
      return minutes + ':' + fractional;
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
  props: [
    'runs',
    'errors',
    'reformattedSearchString'
  ]
};
</script>

<style scoped>
button:focus {
  box-shadow: none !important;
}
</style>
