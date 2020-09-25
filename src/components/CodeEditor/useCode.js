import { ref } from "vue";
let codeRef
export default function(code) {
    if(!codeRef) {
        codeRef = ref(code)
    }
    return codeRef
}