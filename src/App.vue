<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          HIT YOUR STRIDE
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter-desktop is-one-third-tablet is-full-mobile">
            <SearchForm v-on:search="search"/>
          </div>
          <div class="column is-three-quarters-desktop is-two-thirds-tablet">
            <SearchResults
              v-bind:runs="runs"
              v-bind:errors="errors"
            />

            <div style="display: flex;">
              <div v-for="(link, index) in pageLinks" v-bind:key="index">
                <a v-if="link.page > 0" href="#" class="pagination-link" @click="getData('', link.page)">
                  <font-awesome-icon :icon="['fas', link.icon]" />
                </a>
                <a v-else class="pagination-link" disabled>
                  <font-awesome-icon :icon="['fas', link.icon]" />
                </a>
              </div>
            </div>

            <GChart v-bind:runs="runs" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ApiService } from './ApiService';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import GChart from './components/GChart';

const apiService = new ApiService();

export default {
  name: 'app',
  components: {
    SearchForm,
    SearchResults,
    GChart
  },
  data: function() {
    return {
      runs: [],
      errors: [],
      pages: null,
      pageLinks: [],
      queryParams: ''
    };
  },
  methods: {
    search(params) {
      let qParams = '';

      // format query parameters
      for (var key in params) {
        let value = params[key];

        if (value !== '') {
          params[key] = value;

          if (key.startsWith('distance')) {
            value = (value * 1609.34).toFixed(3);
          }

          if (key.startsWith('duration')) {
            value = Math.round(value * 60);
          }

          if (key === 'mile-pace') {
            let res = value.split(':');
            value = (parseInt(res[0]) * 60) + parseInt(res[1]);
          }

          qParams = qParams.concat(`${key}=${value}&`);
        }
      }

      this.queryParams = qParams;
      this.getData(qParams);
    },

    getData(params = '', page = 1) {
      if (params === '') {
        params = this.queryParams;
      }

      apiService
        .getRunActivities(params, page)
        .then((data) => {
          this.runs = data.results
          this.pages = data.pagy
        }).catch(error => {
          this.errors.push(error);
        });
    },

    setPages() {
      this.pageLinks = [];

      if (this.pages.count > 0 && this.pages.page !== 1) {
        this.pageLinks.push({ icon: 'fast-backward', page: 1 });
      } else {
        this.pageLinks.push({ icon: 'fast-backward', page: 0 });
      }

      if (this.pages.prev !== null) {
        this.pageLinks.push({ icon: 'backward', page: this.pages.prev });
      } else {
        this.pageLinks.push({ icon: 'backward', page: 0 });
      }

      if (this.pages.next !== null) {
        this.pageLinks.push({ icon: 'forward', page: this.pages.next });
      } else {
        this.pageLinks.push({ icon: 'forward', page: 0 });
      }

      if (this.pages.last !== null) {
        this.pageLinks.push({ icon: 'fast-forward', page: this.pages.last });
      } else {
        this.pageLinks.push({ icon: 'fast-forward', page: 0 });
      }
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    pages() {
      this.setPages();
    }
  }
}
</script>
