<template>
  <div
    ref="chartdom"
    :style="{
      width: width ? width + 'px' : 0,
      height: height ? height + 'px' : 0,
    }"
  ></div>
</template>

<script>
import echarts from "echarts";
import bar from "options/bar";
import { merge } from "@/mixin/merge";
import calcChartSize from "./calcChartSize";
import { onMounted,  ref } from "vue";

// 图表涉及 数据重绘setOption, 页面宽高resize, 事件监听
export default {
  setup(props) {
    let chart


    const chartdom = ref(null)
    let chartWidth = ref(800)
    let chartHeight = ref(500)

    function init(dom) {
      chart = echarts.init(dom);
    }
    function getOption() {
      let chartOption;
      chart && (chartOption = chart.getOption());
      return chartOption ? chartOption : merge(bar, props.option);
    }
    // function setDataByKeyValue(key, data) {
    //   console.log(key, data);
    // }
    function setData(option) {
      const method2 = merge(getOption(), option);
      chart.setOption(method2);
    }

    function resizeChart(width, height, isResize) {
      const { contentWidth, contentHeight } = calcChartSize(chartdom);
      // return
      const tempWidth = width ? width : contentWidth;
      const tempHeigth = height ? height : contentHeight;
      console.log(tempWidth, tempHeigth);
      chartWidth = tempWidth
      chartHeight = tempHeigth
      isResize && chart && chart.resize();
    }
    onMounted(() => {
      init(chartdom);
      resizeChart();
      setData(bar);
    });

    return { chartdom, chartWidth, chartHeight }
  },
  // data() {
  //     return {
  //         chart: null,
  //         width: 800,
  //         height: 500
  //     }
  // },
  // // watch: {
  // //     width: function(){
  // //         if(chart) {
  // //             chart.resize()
  // //         }
  // //     },
  // //     height: function() {
  // //         if(chart) {
  // //             chart.resize()
  // //         }
  // //     }
  // // },
  // props: {
  //     option: [Object, Array],
  // },
  // computed: {
  //     init_option: function() {
  //         return merge(bar, option)
  //     }
  // },
  // mixins: [ merge ],
  // methods: {
  //     init() {
  //         chart = echarts.init($refs.bar)
  //     },
  //     getOption() {
  //         let chartOption
  //        chart && (chartOption = chart.getOption())
  //         return  chartOption? chartOption: init_option
  //     },
  //     setDataByKeyValue(key, data) {
  //         console.log(key,data
  //         )
  //     },
  //     setData(option) {
  //         const method2 = merge(getOption(), option)
  //         chart.setOption(method2)
  //     },
  // initChartContainerSize(width, height) {
  //     width = width
  //     height = height
  // },
  //     resizeChart(width, height, isResize) {
  //         const { contentWidth, contentHeight } =  calcChartSize($refs.bar)
  //         // return
  //         const tempWidth = width? width: contentWidth
  //         const tempHeigth = height? height: contentHeight
  //         console.log(tempWidth, tempHeigth)
  //         // width = tempWidth
  //         // height = tempHeigth
  //         initChartContainerSize(tempWidth, tempHeigth)
  //         isResize && chart && chart.resize()
  //     }
  // },
  // beforeUnmount() {
  //     if(chart && !chart.isDisposed) {
  //         chart.dispose()
  //     }
  // },
  // mounted() {
  //     init()
  //             resizeChart()
  //     setData()

  // }
};
</script>

<style></style>
