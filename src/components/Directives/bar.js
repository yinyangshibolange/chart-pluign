

const directive = {
    install: Vue => {
        if(Vue.prototype.$isServer) return;
        
        Vue.directive('bar', {
            inserted: (el, binding, vnode) => {

            }
        })
    }
}