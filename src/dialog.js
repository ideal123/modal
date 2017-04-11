let _count = 0
const _options = {
  title: '标题',
  content: '',
  ok: true,
  okValue: '确定',
  cancel: false,
  cancelValue: '取消'
}

const _html = `
  <div class="dialog-mask">
    <div class="dialog-popup">
      <div class="dialog-popup-hd">
        <span>{{title}}</span>
        <span class="close-btn">
          <i class="close-icon"></i>
        </span>
      </div>
      <div class="dialog-popup-bd">{{content}}</div>
      <div class="dialog-popup-ft">{{footer}}</div>
    </div>
  </div>
`

function dialog(options) {
  options = options || {}

  this.el = null
  this.options = Object.assign({}, _options, options)

  // 初始化 dialog
  this._init = function () {
    this._create()
    this._handleAttr()
    this._handleEvent()

    document.body.appendChild(this.el)
    return this
  }

  // 创建元素
  this._create = function () {
    this.el = document.createElement('div')
    this.el.setAttribute('class', 'tes-dialog tes-hidden')

    let footer = []
    if (this.options.cancel) {
      footer.push(`<button class="popup-btn cancel-btn">${ this.options.cancelValue }</button>`)
    }
    if (this.options.ok) {
      footer.push(`<button class="popup-btn ok-btn">${ this.options.okValue }</button>`)
    }

    this.html = _html.replace('{{title}}', this.options.title)
      .replace('{{content}}', this.options.content)
      .replace('{{footer}}', footer.join(''))

    this.el.innerHTML = this.html
  }

  // 处理弹窗属性
  this._handleAttr = function () {
    const expando = new Date() - 0
    _count++

    this.el.setAttribute('id', '' + expando + _count)
  }

  // 处理事件
  this._handleEvent = function () {
    if (isFunction(this.options.ok)) {
      const okBtn = this.el.getElementsByClassName('ok-btn')[0]
      okBtn.addEventListener('click', () => {
        this.options.ok.call(this)
      })
    }

    if (isFunction(this.options.cancel)) {
      const cancelBtn = this.el.getElementsByClassName('cancel-btn')[0]
      cancelBtn.addEventListener('click', () => {
        this.options.cancel.call(this)
      })
    }

    closeBtn = this.el.getElementsByClassName('close-btn')[0]
    closeBtn.addEventListener('click', () => {
      this.close()
    })
  }

  // 显示弹窗
  this.show = function (time) {
    removeClass(this.el, 'tes-hidden')
    if (time) {
      setTimeout(() => {
        this.close()
      })
    }
  }

  // 关闭弹窗
  this.close = function () {
    addClass(this.el, 'tes-hidden')
  }

  // 移除弹窗
  this.remove = function () {
    document.body.removeChild(this.el)
  }
}

const Dialog = window.Dialog = options => {
  return new dialog(options)._init()
}


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
