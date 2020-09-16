<template>
  <div :id="domid"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            domid: Date.now()
        }
    },
    methods: {
        init() {
            const chart = echarts.init(document.getElementById(this.domid))
            console.log(chart)
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>

</style>