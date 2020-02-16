<template>
  <div class="container">
    <ul v-if="errors && errors.length">
      <li v-for="(error, index) in errors" v-bind:key="index">
        {{ error.message }}
      </li>
    </ul>

    <table class="table is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th class="date has-text-centered">Date</th>
          <th class="distance has-text-centered">
            <abbr title="miles">Distance</abbr>
          </th>
          <th class="time has-text-centered">
            <abbr title="H:MM:SS">Time</abbr>
          </th>
          <th class="pace has-text-centered">
            <abbr title="minute/mile">Pace</abbr>
          </th>
          <th class="layoff has-text-centered">
            <abbr title="days">Layoff</abbr>
          </th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="run in runs" v-bind:key="run.id">
          <td>{{ date(run.attributes.start_date) }}</td>
          <td class="has-text-centered">{{ miles(run.attributes.distance) }}</td>
          <td class="has-text-centered">{{ time(run.attributes.moving_time) }}</td>
          <td class="has-text-centered">{{ pace(run.attributes.mile_pace)}}</td>
          <td class="has-text-centered" v-text="run.attributes.layoff"></td>
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
      return moment(date).format('MM-DD-YYYY h:mma');
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
