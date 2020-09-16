/**
  json对象穿入, 深拷贝一份再穿入就不会发生同对象引用重复问题
*/
function isObject(src) {
    return Object.prototype.toString.call(src) === "[object Object]"
  }
  
  // 深拷 
  function deepClone() {
  
  }
  
  // 深assign, 拷贝对象方法,对象数组与null,Date 等引用对象
  function deepAssign() {
  
  }
  
   function  deepPierce(origin, src) {
     if(isObject(origin)) {
      const ori_keys = Object.keys(origin)
      if(isObject(src)) {
        const src_keys = Object.keys(src)
        const len = src_keys.length
        for(let i=0;i<len;i++) {
          if(ori_keys.indexOf(src_keys[i]) > -1) {
            if(isObject(origin[src_keys[i]])) {
              deepPierce(origin[src_keys[i]], src[src_keys[i]])
            } else {
              origin[src_keys[i]] = src[src_keys[i]]
            }
          } else {
            origin[src_keys[i]] = src[src_keys[i]]
          }
        }
      } else {
        origin = src
      }
     } else {
      origin = src
     }
      return origin
  }
  
  // 先试试asign方法, 这是对象拷贝方法, 
  // 问题很多,
  function objAsign(obj1, obj2) {
    return Object.assign({}, obj1, obj2)
  }
  
  const obj1 = {
    name: {
      firstname: '123',
      getName3131() {
        return this.firstname
      },
      dafaf: {
        wo: 1,
        da: {
          kl: [234],
        },
        p: 1
      },
      data: [123, 234]
    },
    a1___1: 123
  }
  
  const obj2 = {
    name: {
      firstname: 'h',
      lastname: 'y',
      jhl(){
        console.log('123')
      },
      dafaf: {
        wo: 7,
        da: {
          kl: [123]
        },
        p: null
      },
      al: [],
      data: [32184, 25211]
    },
    tpaa: {
      jakk: 1,
      fa: {}
    }
  }
  console.log(objAsign(obj1, obj2))
  console.log(deepPierce(obj1, obj2))