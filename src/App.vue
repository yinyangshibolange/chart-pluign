<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div class="container">
    <div class="top"></div>
  <Bar :width="800" :height="500" />
  </div>

    <!-- <Bar /> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Bar from './components/Charts/Bar'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Bar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.container {
  padding-top: 20px;
  width: 1000px;
  height: 800px;
}

.top {
  height: 30px;
  background: #2c3e50;
}
</style>
