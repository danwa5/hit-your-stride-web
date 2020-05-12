<template>
  <div class="map-modal" v-show="value">
    <div class="container">
      <textarea v-model="polyline" class="textarea" rows=6></textarea>

      <button v-on:click.prevent="close">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
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

<style lang="css" scoped>
  .map-modal {
    background-color: #aaa;
    padding: 5px;
  }
</style>
