<template>
  <div class="modal is-active" v-show="value">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ date(this.run.attributes.start_date) }}</p>
        <button v-on:click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column is-three-fifths">
            <div class="google-map" ref="googleMap"></div>
          </div>
          <div class="column is-two-fifths">
            <span class="tag is-dark">Route {{ this.run.attributes.route_id }}</span>

            <div class="mt-2 mb-3">
              <article v-if="this.run.attributes.route_rank !== null" class="message is-small is-warning">
                <div class="message-body">
                  {{ this.rankDescription(this.run.attributes.route_rank, this.run.attributes.route_activity_count) }}
                </div>
              </article>
            </div>

            <table class="table run-details-table is-narrow is-fullwidth">
              <tr><td>City</td><td>{{ this.run.attributes.city }}</td></tr>
              <tr><td>State</td><td>{{ this.run.attributes.state_province }}</td></tr>
              <tr><td>Country</td><td>{{ this.run.attributes.country }}</td></tr>
              <tr><td>Distance</td><td>{{ miles(this.run.attributes.distance) }} miles</td></tr>
              <tr><td>Moving Time</td><td>{{ time(this.run.attributes.moving_time) }}</td></tr>
              <tr><td>Elapsed Time</td><td>{{ time(this.run.attributes.elapsed_time) }}</td></tr>
              <tr><td>Mile Pace</td><td>{{ pace(this.run.attributes.mile_pace) }} min/mile</td></tr>
              <tr><td>Layoff</td><td>{{ this.run.attributes.layoff }} days</td></tr>
            </table>

            <div v-if="this.run.attributes.route_rank !== null">
              <div class="leaderboard-title has-text-centered">
                Best Runs
              </div>
              <table class="table run-details-table is-narrow is-fullwidth">
                <tr>
                  <th>Rank</th>
                  <th>Date</th>
                  <th>Mile Pace</th>
                </tr>
                <tr v-for="(route, index) in routes" v-bind:key="index">
                  <td>{{ route.routeRank }}</td>
                  <td>{{ date_short(route.startDateLocal) }}</td>
                  <td>{{ pace(route.milePace) }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ApiService } from '../ApiService';
import conversion from '../mixins/unitConversion';
import { format, parseISO } from 'date-fns';
import GoogleMapsApiLoader from 'google-maps-api-loader'

const apiService = new ApiService();

export default {
  name: 'RunDetails',
  mixins: [conversion],
  props: {
    value: {
      type: Boolean,
      required: true
    },
    run: {
      type: Object,
      default: () => ({
        id: null,
        attributes: {
          activity_type: null,
          city: null,
          country: null,
          distance: null,
          elapsed_time: null,
          layoff: null,
          mile_pace: null,
          moving_time: null,
          polyline: null,
          route_id: null,
          route_rank: null,
          route_activity_count: null,
          split_distance_coordinates: null,
          start_date: null,
          state_province: null
        }
      }),
    }
  },
  data: function() {
    return {
      google: null,
      map: null,
      runPathCoordinates: null,
      routes: []
    }
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      libraries: ['geometry'],
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
    })
    this.google = googleMapApi;
  },
  beforeUpdate() {
    // decode the encoded polyline to an array of coordinates
    this.runPathCoordinates = this.google.maps.geometry.encoding.decodePath(this.run.attributes.polyline);
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(mapContainer, {});

      var runPath = new this.google.maps.Polyline({
        path: this.runPathCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      })

      runPath.setMap(this.map);

      // add start, finish, and mile markers to map
      this.addMarkers(
        this.map,
        this.runPathCoordinates[0],
        this.runPathCoordinates[this.runPathCoordinates.length-1],
        this.run.attributes.split_distance_coordinates
      )

      // fit and center route on map
      var bounds = new this.google.maps.LatLngBounds();
      for (var n = 0; n < this.runPathCoordinates.length ; n++) {
        bounds.extend(this.runPathCoordinates[n]);
      }
      this.map.fitBounds(bounds);
    },

    addMarkers(map, start, finish, mileMarkers) {
      let startMarker = new this.google.maps.Marker({
        position: start,
        label: 'S',
        title: 'Start'
      })
      startMarker.setMap(map);

      let finishMarker = new this.google.maps.Marker({
        position: finish,
        label: 'F',
        title: 'Finish'
      })
      finishMarker.setMap(map);

      mileMarkers.forEach((element) => {
        let mileNum = Math.round(element.distance).toString();

        let marker = new this.google.maps.Marker({
          position: { lat: element.latlng[0], lng: element.latlng[1] },
          label: mileNum,
          title: 'Mile ' + mileNum
        })

        marker.setMap(map)
      })
    },

    close() {
      this.$emit("input", !this.value);
    },

    date: function(timestamp) {
      if (timestamp != null) {
        return format(parseISO(timestamp.replace(/Z/, '')), "EEEE, MMMM dd, yyyy 'at' h:mma");
      }
    },

    date_short: function(timestamp) {
      if (timestamp != null) {
        return timestamp.substring(0,10);
      }
    },

    getFastestRunsForRoute: function(routeId) {
      apiService.getFastestRunsForRoute(routeId)
        .then((data) => {
          this.routes = data.data.fastestRunsForRoute;
        }).catch(error => {
          this.errors.push(error);
        })
    },

    rankDescription: function(rank, route_activity_count) {
      var desc = '';

      if (rank !== null) {
        let rankStr = rank.toString();
        let place;

        if (rank === 1) {
          place = 'The';
        } else if (rank < 10 || rank > 20) {
          if (rankStr.endsWith('1')) {
            place = rankStr + 'st';
          } else if (rankStr.endsWith('2')) {
            place = rankStr + 'nd';
          } else if (rankStr.endsWith('3')) {
            place = rankStr + 'rd';
          } else {
            place = rankStr + 'th';
          }
        } else {
          place = rankStr + 'th';
        }

        desc = `${place} fastest pace out of ${route_activity_count} runs!`;
      }

      return desc;
    }
  },

  watch: {
    run: function() {
      this.getFastestRunsForRoute(this.run.attributes.route_id);
    }
  }
};
</script>
