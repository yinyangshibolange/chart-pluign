import { assign } from '@/util/obj'

export default {
    methods: {
        merge(obj1, obj2) {
            return assign(obj1, obj2, true)
        },
    }
}