const path = require("path")
function resolve (src) {
    return path.join(__dirname, src)
} 
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
        .set('assets',resolve('./src/assets'))
        .set('options',resolve('./src/package/options'))
    }
}