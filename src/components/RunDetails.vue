<template>
  <div class="modal is-active" v-show="value">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Details</p>
        <button v-on:click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="google-map" ref="googleMap"></div>
      </section>
    </div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  name: 'RunDetails',
  props: {
    value: {
      required: true
    },
    polyline: String
  },
  data() {
    return {
      google: null,
      map: null,
      runPathCoordinates: null
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
    this.runPathCoordinates = this.google.maps.geometry.encoding.decodePath(this.polyline);
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

      // fit and center route on map
      var bounds = new this.google.maps.LatLngBounds();
      for (var n = 0; n < this.runPathCoordinates.length ; n++) {
        bounds.extend(this.runPathCoordinates[n]);
      }
      this.map.fitBounds(bounds);
    },
    close() {
      this.$emit("input", !this.value);
    }
  },
};
</script>
