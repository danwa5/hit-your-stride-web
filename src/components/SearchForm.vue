<template>
  <form>
    <input
      v-model="form['city']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="City"
    >
    <input
      v-model="form['country']"
      v-on:keydown.13.prevent="parseFormFields"
      type="text"
      placeholder="Country"
    >
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
