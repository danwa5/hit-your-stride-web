<template>
  <div class="modal is-active" v-show="value">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Details</p>
        <button v-on:click.prevent="close" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <textarea v-model="polyline" class="textarea" rows="5"></textarea>

        <GoogleMapLoader :mapConfig="mapConfig" />
      </section>
    </div>
  </div>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader';

export default {
  name: 'Modal',
  components: {
    GoogleMapLoader
  },
  props: {
    value: {
      required: true
    },
    polyline: String
  },
  methods: {
    close() {
      this.$emit("input", !this.value);
    }
  },
};
</script>
