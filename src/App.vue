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
              v-bind:reformattedSearchString="reformattedSearchString"
            />

            <div style="display: flex;">
              <div v-for="(link, index) in pageLinks" v-bind:key="index" style="margin: 10px;">
                <a href="#" @click="getData('', link.page)">{{ link.label }}</a>
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
      queryParams: '',
      reformattedSearchString: ''
    };
  },
  methods: {
    search(searchParams) {
      let qParams = '';

      // format query parameters
      for (var key in searchParams) {
        let value = searchParams[key];

        if (value !== '') {
          searchParams[key] = value;

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

      this.reformattedSearchString = searchParams;
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
        this.pageLinks.push({ label: 'First', page: 1 });
      }

      if (this.pages.prev !== null) {
        this.pageLinks.push({ label: 'Previous', page: this.pages.prev });
      }

      if (this.pages.next !== null) {
        this.pageLinks.push({ label: 'Next', page: this.pages.next });
      }

      if (this.pages.last !== null) {
        this.pageLinks.push({ label: 'Last', page: this.pages.last });
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
