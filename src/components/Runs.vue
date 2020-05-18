<template>
  <div class="runs">
    <ul v-if="errors && errors.length">
      <li v-for="(error, index) in errors" v-bind:key="index">
        {{ error.message }}
      </li>
    </ul>

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
          <td>{{ date(run.attributes.start_date) }}</td>
          <td>{{ miles(run.attributes.distance) }}</td>
          <td>{{ time(run.attributes.moving_time) }}</td>
          <td>{{ pace(run.attributes.moving_time, run.attributes.distance) }}</td>
          <td>{{ location(run.attributes) }}</td>
        </tr>
      </tbody>
    </table>

    <div style="display: flex;">
      <div v-for="(link, index) in pageLinks" v-bind:key="index" style="margin: 10px;">
        <a href="#" @click="getRunActivities(link.page)">{{ link.label }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ApiService } from '../ApiService';
import moment from 'moment'

const apiService = new ApiService();

export default {
  name: 'Runs',
  data: function() {
    return {
      runs: [],
      errors: [],
      pages: null,
      pageLinks: [],
    }
  },
  methods: {
    getRunActivities: function(page) {
      apiService.getRunActivities(page)
                .then((data) => {
                  this.runs = data.results
                  this.pages = data.pagy
                }).catch((e) => {
                  this.errors.push(e)
                });
    },
    setPages() {
      this.pageLinks = [];

      if (this.pages.count > 0 && this.pages.page !== 1) {
        this.pageLinks.push({ label: 'First', page: 1 });
      }

      if (this.pages.prev !== null) {
        this.pageLinks.push({ label: 'Previous', page: this.pages.prev });
      }

      if (this.pages.next !== null) {
        this.pageLinks.push({ label: 'Next', page: this.pages.next });
      }

      if (this.pages.last !== null) {
        this.pageLinks.push({ label: 'Last', page: this.pages.last });
      }
    },
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
    this.getRunActivities();
  },
  watch: {
    pages() {
      this.setPages();
    }
  }
}
</script>
