<template>
  <div ref="bar" :style="{
      ...size
  }"></div>
</template>

<script>
import echarts from 'echarts'
import bar from 'options/bar'
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
           console.log( this.$refs.bar)
            const chart = echarts.init(this.$refs.bar)
            // this.$refs.bar.style.width = '500px'
            // this.$refs.bar.style.height = '500px'
            // console.log(chart)
            // console.log(bar)

            // const newOption = {
            //     title: {
            //         text: '这是标题?'
            //     }
            // }
            const newOption1 = {
                series: [{
                    data: [1, 2, 3, 4, 5, 6, 7]
                }]
            }
            // this.merge(bar, newOption)
            // console.log(newOption)
            chart.setOption(this.merge(bar, newOption1))
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>

</style>