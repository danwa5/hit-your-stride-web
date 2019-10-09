<template>
  <form>
    <input
      v-model="form['city']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="City"
    >
    <br/>
    <input
      v-model="form['country']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Country"
    >
    <br/>
    <input
      v-model="form['distance-min']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Distance (miles, min)"
    >
    <input
      v-model="form['distance-max']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Distance (miles, max)"
    >
    <br/>
    <input
      v-model="form['duration-min']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Duration (minutes, min)"
    >
    <input
      v-model="form['duration-max']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Duration (minutes, max)"
    >
    <br/>
    <input
      v-model="form['mile-pace']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Mile Pace (M:SS)"
    >
    <br/>
    <input
      v-model="form['layoff-min']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Layoff (days, min)"
    >
    <input
      v-model="form['layoff-max']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Layoff (days, max)"
    >
    <br/>
    <button v-on:click="parseFormFields" type="button">Search</button>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      form: {}
    };
  },
  methods: {
    parseFormFields() {
      const searchParams = {};

      for (var key in this.form) {
        let value = this.form[key].trim();
        if (value !== '') {
          searchParams[key] = value;
        }
      }

      if (Object.keys(searchParams).length > 0) {
        this.$emit('search', searchParams);
      }
    }
  }
};
</script>

<style scoped>
input,
button {
  box-shadow: none !important;
}

.form-control {
  border-color: #6c757d;
}
</style>
