<template>
  <form>
    <div class="field">
      <label class="label">
        City
        <div class="control">
          <input
            v-model="form['city']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="City"
            class="input is-small"
          >
        </div>
      </label>
    </div>

    <div class="field">
      <label class="label">
        Country
        <div class="control">
          <input
            v-model="form['country']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="Country"
            class="input is-small"
          >
        </div>
      </label>
    </div>

    <div class="field">
      <label class="label">
        Distance (miles)
        <div class="field-body is-horizontal">
          <div class="field">
            <input
              v-model="form['distance-min']"
              v-on:keydown.13.prevent="parseFormFields"
              type="text"
              placeholder="min"
              class="input is-small"
            >
          </div>
          <div class="field">
            <input
              v-model="form['distance-max']"
              v-on:keydown.13.prevent="parseFormFields"
              type="text"
              placeholder="max"
              class="input is-small"
            >
          </div>
        </div>
      </label>
    </div>

    <div class="field">
      <label class="label">
        Duration (minutes)
        <div class="field-body is-horizontal">
          <div class="field">
            <input
              v-model="form['duration-min']"
              v-on:keydown.13.prevent="parseFormFields"
              type="text"
              placeholder="min"
              class="input is-small"
            >
          </div>
          <div class="field">
            <input
              v-model="form['duration-max']"
              v-on:keydown.13.prevent="parseFormFields"
              type="text"
              placeholder="max"
              class="input is-small"
            >
          </div>
        </div>
      </label>
    </div>

    <div class="field">
      <label class="label">
        Mile Pace (M:SS)
        <div class="control">
          <input
            v-model="form['mile-pace']"
            v-on:keydown.13.prevent="parseFormFields"
            type="text"
            placeholder="Mile Pace"
            class="input is-small"
          >
        </div>
      </label>
    </div>

    <div class="field">
      <label class="label">
        Layoff (days)
        <div class="field-body is-horizontal">
          <div class="field">
            <input
              v-model="form['layoff-min']"
              v-on:keydown.13.prevent="parseFormFields"
              type="text"
              placeholder="Layoff (min)"
              class="input is-small"
            >
          </div>
          <div class="field">
            <input
              v-model="form['layoff-max']"
              v-on:keydown.13.prevent="parseFormFields"
              type="text"
              placeholder="max"
              class="input is-small"
            >
          </div>
        </div>
      </label>
    </div>

    <div class="field">
      <div class="buttons">
        <button v-on:click="parseFormFields" type="button" class="button is-primary is-small">Search</button>
        <button v-on:click="resetForm" type="button" class="button is-light is-small">Reset</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  data: function() {
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
