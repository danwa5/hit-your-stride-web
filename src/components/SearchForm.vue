<template>
  <form>
    <div class="field">
      <label class="label">City</label>
      <div class="control">
        <input
          v-model="form['city']"
          v-on:keydown.13.prevent="parseFormFields"
          type="text"
          placeholder="City"
          class="input"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">Country</label>
      <div class="control">
        <input
          v-model="form['country']"
          v-on:keydown.13.prevent="parseFormFields"
          type="text"
          placeholder="Country"
          class="input"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">Distance (miles)</label>
      <div class="field-body is-horizontal">
        <div class="field">
          <input
            v-model="form['distance-min']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="min"
            class="input"
          >
        </div>
        <div class="field">
          <input
            v-model="form['distance-max']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="max"
            class="input"
          >
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Duration (minutes)</label>
      <div class="field-body is-horizontal">
        <div class="field">
          <input
            v-model="form['duration-min']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="min"
            class="input"
          >
        </div>
        <div class="field">
          <input
            v-model="form['duration-max']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="max"
            class="input"
          >
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Mile Pace (M:SS)</label>
      <div class="control">
        <input
          v-model="form['mile-pace']"
          v-on:keydown.13.prevent="parseFormFields"
          type="text"
          placeholder="Mile Pace"
          class="input"
        >
      </div>
    </div>

    <div class="field">
      <label class="label">Layoff (days)</label>
      <div class="field-body is-horizontal">
        <div class="field">
          <input
            v-model="form['layoff-min']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="Layoff (min)"
            class="input"
          >
        </div>
        <div class="field">
          <input
            v-model="form['layoff-max']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="max"
            class="input  "
          >
        </div>
      </div>
    </div>

    <div class="field">
      <div class="buttons">
        <button v-on:click="parseFormFields" type="button" class="button is-primary">Search</button>
        <button v-on:click="resetForm" type="button" class="button is-light">Reset</button>
      </div>
    </div>
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
    },

    resetForm() {
      this.$emit('search', {});
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
