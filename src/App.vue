<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div class="container">
    <!-- <div class="top"></div> -->
    <Bar ref="bar1" />
    <!-- <Line :width="800" :height="500" /> -->
    <div>
          <textarea v-model="barOption" id="textarea" style="width: 800px; height: 100px;"/>
    </div>

  </div>
  <div style="clear: both;"></div>
    <button @click="runWithOption($refs.bar1, barOption)">插入运行</button>

  <button
    @click="
      $refs.bar1.resizeChart(500,300)
    "
  >resize</button>

  <!-- <Bar /> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Bar from "@/components/Charts/Bar";
// import Line from '@/components/Charts/Line';

import CodeMirror from "codemirror";

import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";

require("script-loader!jsonlint");

export default {
  name: "App",
  data() {
    return {
      codemirror: null,
      barOption: "",
    };
  },
  components: {
    Bar,
    // Line,
  },
  methods: {
    runWithOption(chart, option) {
      let optionObj;
      try {
        optionObj = JSON.parse(option);
      } catch (err) {
        console.log(err);
      }
      chart.setData(optionObj)
    },
    initCodeEditor() {
      const textarea = document.getElementById("textarea")
      this.codemirror = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
				mode: "application/json",
				gutters: ["CodeMirror-lint-markers"],
				// theme: "rubyblue",
				lint: true,

      })
    }
  },
  mounted() {
    this.initCodeEditor()
    // this.$refs.bar1.setData({
    //   title: {
    //     text: "测试regbar1",
    //   },
    // });
  },
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
