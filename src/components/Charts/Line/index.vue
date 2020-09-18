<template>
  <div ref="line" :style="{
      ...size
  }"></div>
</template>

<script>
import echarts from 'echarts'
import line from 'options/line'
import merge from '@/mixin/merge'
import size from '@/mixin/size'
export default {
    data() {
        return {
        }
    },
    props: {
        option: [Object, Array],
        width: [String, Number],
        height: [String, Number]
    },
    mixins: [ merge, size ],
    methods: {
        init() {
            const chart = echarts.init(this.$refs.line)
            chart.setOption(this.merge(line, this.option))
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>

</style>