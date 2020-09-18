<template>
  <div ref="bar" :style="{
      ...size
  }"></div>
</template>

<script>
import echarts from 'echarts'
import bar from 'options/bar'
import {merge, size, watch} from '@/mixin'

// 图表涉及 数据重绘setOption, 页面宽高resize, 事件监听
export default {
    data() {
        return {
            chart: null
        }
    },
    props: {
        option: [Object, Array],
        width: [String, Number],
        height: [String, Number]
    },
    mixins: [ merge, size, watch ],
    methods: {
        init() {
            this.chart = echarts.init(this.$refs.bar)
        },
        setData() {
            // const method1 = this.mergeByKey(bar, 'series[0].data', [1,2,3,4,5,6,7])
            const method2 = this.merge(bar, this.option)
            this.chart.setOption(method2)
        }
    },
    beforeUnmount() {
        if(this.chart && !this.chart.isDisposed) {
            this.chart.dispose()
        }
    },
    mounted() {
        this.init()
        this.setData()
    }
}
</script>

<style>

</style>