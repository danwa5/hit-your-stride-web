<template>
  <form>
    <input
      v-model="searchString"
      v-on:keydown.13.prevent="parseSearchString"
      type="text"
      class="form-control"
      placeholder="Search ..."
    >
    <button v-on:click="parseSearchString" type="button">Search</button>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      searchString: ''
    };
  },
  methods: {
    parseSearchString() {
      // Trim search string
      const searchParams = this.searchString.trim();

      if (searchParams !== '') {
        // Emit event
        this.$emit('search', searchParams);
        // Reset input field
        // this.searchString = '';
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
