<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div
    class="container"
    :style="{
      width: cwidth + 'px',
      height: cheight + 'px',
    }"
  >
    <!-- <div class="top"></div> -->
    <Bar ref="bar1" />
    <!-- <Line :width="800" :height="500" /> -->
  </div>
  <CodeEditor />
  <div style="clear: both;"></div>
  <button @click="runWithOption($refs.bar1, barOption)">插入运行</button>

  <button @click="resizeChart(1000, 800)">resize</button>

  <!-- <Bar /> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Bar from "@/components/Charts/Bar";
// import Line from '@/components/Charts/Line';
import CodeEditor from '@/components/CodeEditor'
import useCode from '@/components/CodeEditor/useCode'
import { ref, nextTick } from 'vue';

export default {
  setup() {
    const code = useCode(null) 
    const cwidth = ref(800)
    const cheight = ref(500)

    function resizeChart(width, height) {
      cwidth.value = width;
      cheight.value = height;
      // 重新渲染这一阵完成之后再resize chart
      nextTick(() => {
        this.$refs.bar1.resizeChart(0, 0, true);
      });
    }
     function  runWithOption(chart, option) {
      let optionObj;
      try {
        optionObj = JSON.parse(option);
      } catch (err) {
        console.log(err);
      }
      chart.setData(optionObj);
    }

    return { Bar, CodeEditor, code, cwidth, cheight, resizeChart, runWithOption }
  }
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.container {
  /* padding-top: 20px; */
  width: 1000px;
  height: 800px;
}

.top {
  height: 30px;
  background: #2c3e50;
}
</style>
