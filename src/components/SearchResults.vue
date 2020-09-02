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
          <th class="layoff has-text-centered is-hidden-mobile">
            <abbr title="days">Layoff</abbr>
          </th>
          <th class="route has-text-centered is-hidden-mobile">
            Route
          </th>
          <th class="is-hidden-mobile">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-on:click="openModal(run)"
            v-for="run in runs" v-bind:key="run.id">
          <td>{{ date(run.attributes.start_date) }}</td>
          <td class="has-text-centered">{{ miles(run.attributes.distance) }}</td>
          <td class="has-text-centered">{{ time(run.attributes.moving_time) }}</td>
          <td class="has-text-centered">{{ pace(run.attributes.mile_pace)}}</td>
          <td class="has-text-centered is-hidden-mobile" v-text="run.attributes.layoff"></td>
          <td class="has-text-centered is-hidden-mobile">
            {{ run.attributes.route_id }}
            <font-awesome-icon icon="medal" v-if="firstPlace(run.attributes.route_rank)"></font-awesome-icon>
          </td>
          <td class="is-hidden-mobile">{{ location(run.attributes) }} </td>
        </tr>
      </tbody>
    </table>

    <RunDetails v-model="modalOpen" v-bind:run="selectedRun || undefined" />
  </div>
</template>

<script>
import conversion from '../mixins/unitConversion';
import { format, parseISO } from 'date-fns';
import RunDetails from './RunDetails';

export default {
  name: 'SearchResults',
  components: {
    RunDetails
  },
  mixins: [conversion],
  props: {
    runs: Array,
    errors: Array,
  },
  data: function() {
    return {
      title: 'Search Results',
      displayMode: 'grid',
      modalOpen: false,
      selectedRun: null
    };
  },
  methods: {
    date: function(timestamp) {
      return format(parseISO(timestamp.replace(/Z/, '')), 'MM-dd-yyyy h:mmaaaaa');
    },

    firstPlace: function(rank) {
      return rank !== null && rank == 1 ? true : false;
    },

    location: function(attrs) {
      var location = attrs.city;

      if (attrs.state_province !== null && attrs.state_province != attrs.city) {
        location += ', ' + attrs.state_province;
      }

      if (attrs.country !== null) {
        location += ', ' + attrs.country;
      }

      return location;
    },

    openModal(run) {
      this.modalOpen = !this.modalOpen;
      this.selectedRun = run;
    }
  }
};
</script>
