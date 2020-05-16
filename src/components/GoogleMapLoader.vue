<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  props: {
    mapConfig: Object
  },
  data() {
    return {
      google: null,
      map: null
    }
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
    })
    this.google = googleMapApi
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap
      // this.map = new this.google.maps.Map(mapContainer, this.mapConfig)

      this.map = new this.google.maps.Map(mapContainer, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });

    }
  }
}
</script>