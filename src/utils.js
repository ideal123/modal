// 判断对象是函数
function isFunction(f) {
  return Object.prototype.toString.call(f).slice(8, -1) === 'Function'
}

// 数组去重
function uniqueArr(arr) {
  return arr.filter((item, index) => index === arr.indexOf(item))
}

// 添加 class
function addClass(el, name) {
  const str = el.getAttribute('class')
  let arr = str ? str.split(' ') : []

  arr.push(name)
  arr = uniqueArr(arr)

  el.setAttribute('class', arr.join(' '))
}

// 移除 class
function removeClass(el, name) {
  const str = el.getAttribute('class')
  let arr = str ? str.split(' ') : []

  arr = uniqueArr(arr)
  if (arr.indexOf(name) !== -1) {
    arr.splice(arr.indexOf(name), 1)
  }

  if (!arr.length) {
    return el.removeAttribute('class')
  }
  el.setAttribute('class', arr.join(' '))
}

const utils = {
  isFunction,
  uniqueArr,
  addClass,
  removeClass
}
