export default {
    computed: {
        size() {
            const widthIsNumber = typeof this.width === 'number'
            const heightIsNumber = typeof this.height === 'number'
            const widthIsString = typeof this.width === 'string'
            const heightIsString = typeof this.height === 'string'
            const size = {}
            if(widthIsNumber) {
                size.width = this.width + 'px'
            }
            if(heightIsNumber) {
                size.height = this.height + 'px'
            }
            if(widthIsString) {
                size.width = this.width
            }
            if(heightIsString) {
                size.height = this.height
            }
            return size
        }
    }
}