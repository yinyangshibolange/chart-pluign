/**
  json对象穿入, 深拷贝一份再穿入就不会发生同对象引用重复问题
*/
const _toString = Object.prototype.toString;

function isObject(src) {
  return toRawType(src) === "Object";
}

// 区分基本数据类型和应用数据类型
function isObjectType(src) {
  return src instanceof Object;
}

// code from vue
function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

function repeat(value, count, joinFlag) {
    const temp = []
    let i = 0
    while(i < count) {
        temp.push(value)
        i ++
    }
    return joinFlag? temp.join(joinFlag): temp
}

function keyStr2Arr(keyStr) {
    const arr = keyStr.split('.')
    const temp = arr.map(ele => {
        const matchArr = ele.match(/\[\d+\]/g)
        if(matchArr) {
            const okey = ele.substr(0, ele.indexOf(matchArr[0]))
            if(okey) return [okey].concat(matchArr.map(ma => parseInt(ma.slice(1, -1))))
            return matchArr.map(ma => parseInt(ma.slice(1, -1)))
        } else {
            return ele
        }
    })
    return temp.reduce((a, b) => {
        return a.concat(b)
    }, [])
}

// 根据keyarr生成一个引用对象
function composeObject(keyarr, value, next) {
    let temp 
    const key = keyarr[next]
    if(typeof key === 'number') {
        if(next === keyarr.length - 1) {
            temp = [ ...repeat(undefined, key) , value]
        } else {
            temp = [...repeat(undefined, key), composeObject( keyarr, value, next + 1)]
        }
    } else if(typeof key === 'string') {
        if(next === keyarr.length - 1) {
            temp = {
                [key]: value
            }
        } else {
            temp = {
                [key]: composeObject( keyarr, value, next + 1)
            }
        }
    }
    return temp 
}

// key/vlaue深穿,
function deepPierceByKey(origin, keystr, value) {
    const keys = keyStr2Arr(keystr)
    let temp = origin
    try {
        keys.forEach((ele, index) => {
            if(index === keys.length - 1) {
                temp[ele] = value
            } else {
                temp = temp[ele]
            }
        })
    } catch(err) {
        throw Error('key path is not correct')
    }
    return origin
}

//   console.log(toRawType(null))

// 深拷 ,如果是数组咋办,时间咋办,null咋办, 方法Function咋办, 其他引用对象咋办
function deepClone(origin) {
  let resdata;
  const rowType = toRawType(origin);
  const _isObjectType = isObjectType(origin);
  if (_isObjectType) {
    if (rowType === "Object") {
      const keys = Object.keys(origin);
      resdata = new Object();
      for (let i = 0; i < keys.length; i++) {
        resdata[keys[i]] = deepClone(origin[keys[i]]);
      }
    } else if (rowType === "Array") {
      resdata = origin.map((ele) => {
        return deepClone(ele);
      });
    } else if (rowType === "Date") {
      resdata = new Date(origin.getTime());
    } else if (rowType === "Function") {
      // 拖鞋
      resdata = origin;
    } else {
      // 其他引用对象拖鞋
      resdata = origin;
    }
  } else {
    // 基本数据类型直接赋值
    resdata = origin;
  }
  return resdata;
}

// 深assign, 拷贝对象方法,对象数组与null,Date 等引用对象
 function deepAssign(origin, src, isIncludeArray = false) {
  const clone = deepClone(origin);
  if(toRawType(src) === 'Object') {
    return deepPierce(clone, src, isIncludeArray);
  } else if (toRawType(src) === 'Array') {
      let temp = clone
    src.forEach(ele => {
        temp = deepPierce(temp, ele, isIncludeArray)
    })
    return temp
  } else {
      return origin
  }
}


// isPierceArrayObj 表示是否刺穿数组内的引用对象,利用原引用对象,不开辟新对象,测试通过
function deepPierce(origin, src, isPierceArrayObj = false) {
  if (isObject(origin)) {
    const ori_keys = Object.keys(origin);
    if (isObject(src)) {
      const src_keys = Object.keys(src);
      const len = src_keys.length;
      for (let i = 0; i < len; i++) {
        if (ori_keys.indexOf(src_keys[i]) > -1) {
          if (isObject(origin[src_keys[i]])) {
            deepPierce(origin[src_keys[i]], src[src_keys[i]], isPierceArrayObj);
          } else if(isPierceArrayObj && toRawType(origin[src_keys[i]]) === 'Array' && toRawType(src[src_keys[i]]) === 'Array') {
            origin[src_keys[i]] = deepPierce(origin[src_keys[i]], src[src_keys[i]], isPierceArrayObj);
          } 
          else {
            origin[src_keys[i]] = src[src_keys[i]];
          }
        } else {
          origin[src_keys[i]] = src[src_keys[i]];
        }
      }
    } else {
      origin = src;
    }
  } else if(toRawType(origin) === 'Array' && toRawType(src) === 'Array') {
      if(isPierceArrayObj) {
        const originLen = origin.length
        const srcLen = src.length
        if(originLen >= srcLen) {
            origin = origin.map((ele, index) => {
                if(isObject(src[index])){
                    if(isObject(ele)) {
                        return deepPierce(ele, src[index], isPierceArrayObj);
                    } else {
                        return src[index]
                    }
                } else if(src[index] !== undefined && src[index] !== null) {
                    return src[index]
                } else {
                    return ele
                }
            })
        } else {
            origin = origin.map((ele, index) => {
                const isObjOri = isObject(ele)
                const isObjSrc = isObject(src[index])
                if(isObjSrc) {
                    if(isObjOri) {
                        return deepPierce(ele, src[index], isPierceArrayObj);
                    } else {
                        return src[index]
                    }
                }  else if(src[index] !== undefined && src[index] !== null) {
                    return src[index]
                } else {
                    return ele
                }
            }).concat(src.slice(originLen))
        }
      } else {
            origin = src;
        }
  } else {
      origin = src
  }
  return origin;
}

export const clone = deepClone
export const assign = deepAssign
export const compose = composeObject
export const pierce = deepPierceByKey


// return;

// // 先试试asign方法, 这是对象拷贝方法,
// // 问题很多,
// function objAsign(obj1, obj2) {
//   return Object.assign({}, obj1, obj2);
// }



// // test
// // 测试克隆方法, 引用对象地址判断,顺便判断基本数据类型
// function objectTest(origin) {
//   const clone = deepClone(origin);
//   deepTest(origin, clone);
// }

// function testStringifyParse(origin) {
//   const clone = JSON.parse(JSON.stringify(origin));
//   deepTest(origin, clone);
// }

// function repeat(str, count) {
//     if (!count || toRawType(count) !== "Number") return str;
//     let temp = "";
//     let i = 0;
//     while (i < count) {
//       temp += str;
//       i++;
//     }
//     return temp;
//   }
// // 测试深克隆
// function deepTest(origin, clone, step = 0) {
//   const _rowTypeOrigin = toRawType(origin);
//   const _rowTypeClone = toRawType(clone);
//   const _isObjectTypeOrigin = isObjectType(origin);
//   const _isObjectTypeClone = isObjectType(clone);
//   if (_isObjectTypeOrigin && _isObjectTypeClone) {
//     if (origin === clone) {
//       console.log(origin, clone, "object: origin = clone, 引用地址没变");
//       return;
//     }
//     if (_rowTypeOrigin === "Array" && _rowTypeClone === "Array") {
//       const len = origin.length;
//       for (let i = 0; i < len; i++) {
//         deepTest(origin[i], clone[i]);
//       }
//       return;
//     } else if (_rowTypeOrigin === "Array" && _rowTypeClone !== "Array") {
//       console.log(
//         origin,
//         clone,
//         "clone Error, origin is Array but clone is not"
//       );
//       return;
//     }
//     if (_rowTypeOrigin === "Object" && _rowTypeClone === "Object") {
//       const originKeys = Object.keys(origin);
//       const cloneKeys = Object.keys(clone);
//       if (originKeys.length !== cloneKeys.length) {
//         console.log(
//           origin,
//           clone,
//           "clone Error, object keys length is not equal"
//         );
//         return;
//       }
//       let count = 0;
//       originKeys.forEach((ele) => {
//         if (cloneKeys.indexOf(ele) > -1) count++;
//       });
//       if (count !== originKeys.length) {
//         console.log(origin, clone, "clone Error, object keys is not equal");
//         return;
//       }
//       originKeys.forEach((originKey) => {
//         console.log(repeat("-", step + 1) + '"' + originKey + '":');
//         deepTest(origin[originKey], clone[originKey], step + 1);
//       });
//       return;
//     } else if (_rowTypeOrigin === "Object" && _rowTypeClone !== "Object") {
//       console.log(
//         origin,
//         clone,
//         "clone Error, origin is Object but clone is not"
//       );
//       return;
//     }

//     if (_rowTypeOrigin === "Date" && _rowTypeClone === "Date") {
//       if (origin.getTime() !== clone.getTime()) {
//         console.log(
//           origin,
//           clone,
//           "clone Error, time origin and time clone is not equal"
//         );
//       }
//       return;
//     } else if (_rowTypeOrigin === "Date" && _rowTypeClone !== "Date") {
//       console.log(
//         origin,
//         clone,
//         "clone Error, origin is Date but clone is not"
//       );
//       return;
//     }

//     if (_rowTypeOrigin === "Function" && _rowTypeClone === "Function") {
//       if (origin() !== clone()) {
//         // 就这样判断吧,其实不会到这一步
//         console.log(
//           origin,
//           clone,
//           "clone Error,result from Function origin and  result from Function clone  is not equal"
//         );
//       }
//       return;
//     } else if (_rowTypeOrigin === "Function" && _rowTypeClone !== "Function") {
//       console.log(
//         origin,
//         clone,
//         "clone Error, origin is Function but clone is not"
//       );
//       return;
//     }
//   } else if (_isObjectTypeOrigin && !_isObjectTypeClone) {
//     console.log(
//       origin,
//       clone,
//       "origin is object, but clone is not object, so clone error"
//     );
//   } else {
//     console.log(origin, clone, "base data: origin = clone  ");
//   }
// }

// const obj1 = {
//   name: {
//     firstname: "123",
//     getName3131() {
//       return this.firstname;
//     },
//     dafaf: {
//       wo: 1,
//       da: {
//         kl: [234],
//       },
//       p: 1,
//     },
//     data: [123, 234,378],
//   },
//   a1___1: 123,
// };

// const obj2 = {
//   name: {
//     firstname: "h",
//     lastname: "y",
//     jhl() {
//       console.log("123");
//     },
//     dafaf: {
//       wo: 7,
//       da: {
//         kl: [123],
//       },
//       p: null,
//     },
//     al: [],
//     data: [32184, 25211],
//   },
//   tpaa: {
//     jakk: 1,
//     fa: {},
//   },
// };

// const obj3 = {
//   a: [123, 234],
//   b: 2,
//   c: {
//     d: 3,
//     e: {
//       f: 4,
//       g: 7,
//       h: [23, 45],
//     },
//   },
// };

// // 脚本测试, 未出现clone Error字样就说明克隆成功
// //   console.log(objAsign(obj1, obj2))
// //   console.log(deepPierce(obj1, obj2))

// //   console.log('obj1', deepClone(obj1))
// //   console.log('obj2', deepClone(obj2))

// // objectTest(obj1);

// //   objectTest(obj2)
// // testStringifyParse(obj2)
// // testStringifyParse(obj3)

// console.log(deepAssign(obj1, obj2, true))