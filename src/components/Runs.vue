<template>
  <div class="runs">
    <table>
      <thead>
        <tr>
          <th>UID</th>
          <th>Date</th>
          <th>Distance</th>
          <th>Time</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="run in runs" v-bind:key="run">
          <td v-text="run.data.attributes.uid"></td>
          <td v-text="run.data.attributes.start_date"></td>
          <td v-text="run.data.attributes.distance"></td>
          <td v-text="run.data.attributes.moving_time"></td>
          <td>{{ location(run.data.attributes) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Runs',
  data() {
    return {
      runs: []
    }
  },
  methods: {
    location: function(attrs) {
      return attrs.city + ', ' + attrs.state_province + ', ' + attrs.country;
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
