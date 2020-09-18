export default {
    watch: {
        width: function(){
            if(this.chart) {
                this.chart.resize()
            }
        },
        height: function() {
            if(this.chart) {
                this.chart.resize()
            }
        }
    }
}