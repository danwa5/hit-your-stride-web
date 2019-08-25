<template>
  <div id="app">
    <Runs />
  </div>
</template>

<script>
import Runs from './components/Runs.vue'

export default {
  name: 'app',
  components: {
    Runs
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
