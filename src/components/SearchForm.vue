<template>
  <form>
    <div class="field">
      <label class="label">
        City
        <div class="control">
          <select v-model="form['city']" class="input is-small">
            <option value='' disabled selected>Select a City</option>
            <option v-for="location in locations" :key="location.text" :value="location.value">
              {{ location.text }}
            </option>
          </select>
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
              placeholder="min"
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
import { ApiService } from '../ApiService';

const apiService = new ApiService();

export default {
  name: 'SearchForm',
  data: function() {
    return {
      form: {},
      locations: []
    };
  },
  methods: {
    getLocations() {
      apiService
        .getRunLocations()
        .then((data) => {
          this.locations = data.results.sort(function(a, b) {
            // sort locations by country and then city
            if (a.attributes.country > b.attributes.country) {
              return 1
            } else if (a.attributes.country === b.attributes.country) {
              if (a.attributes.city > b.attributes.city) {
                return 1
              } else {
                return -1
              }
            } else {
              return -1
            }
          }).map(res => {
            let o = {}
            o['text'] = this.formatLocation(res.attributes.city, res.attributes.state_province, res.attributes.country)
            o['value'] = res.attributes.city
            return o
          })
        }).catch(error => {
          this.errors.push(error);
        })
    },

    formatLocation(city, state, country) {
      var location = city;

      if (state !== null && state !== city) {
        location += ', ' + state;
      }

      if (country !== null) {
        location += ', ' + country;
      }

      return location;
    },

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
      this.form['city'] = undefined;
    }
  },
  mounted() {
    this.getLocations();
  }
};
</script>
