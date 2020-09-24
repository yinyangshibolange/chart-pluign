export default {
    computed: {
        size() {
            const chartWidthIsNumber = typeof this.chartWidth === 'number'
            const chartHeightIsNumber = typeof this.chartHeight === 'number'
            const chartWidthIsString = typeof this.chartWidth === 'string'
            const chartHeightIsString = typeof this.chartHeight === 'string'
            const size = {}
            if(chartWidthIsNumber) {
                size.chartWidth = this.chartWidth + 'px'
            }
            if(chartHeightIsNumber) {
                size.chartHeight = this.chartHeight + 'px'
            }
            if(chartWidthIsString) {
                size.chartWidth = this.chartWidth
            }
            if(chartHeightIsString) {
                size.chartHeight = this.chartHeight
            }
            return size
        }
    }
}