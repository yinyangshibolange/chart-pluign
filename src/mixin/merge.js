import { clone, assign, pierce } from '@/util/obj'

export default {
    methods: {
        merge(obj1, obj2) {
            return assign(obj1, obj2, true)
        },
        mergeByKey(obj, keyStr, value) {
            if(!keyStr && !value) {
                return obj
            }
            if(!keyStr && value) {
                return value
            }
            const cloneObj = clone(obj)
            return pierce(cloneObj, keyStr, value)
        }
    }
}