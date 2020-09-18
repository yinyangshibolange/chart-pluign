<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div class="container">
    <div class="top"></div>
      <Bar :width="barWidth" :height="barHeight" />
      <Line :width="800" :height="500" />
  </div>

  <a @click="barWidth = 400; barHeight = 250"></a>

    <!-- <Bar /> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Bar from '@/components/Charts/Bar';
import Line from '@/components/Charts/Line';

export default {
  name: 'App',
  data() {
    return {
      barWidth: 800,
      barHeight: 500,
    }
  },
  components: {
    Bar,
    Line,
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
