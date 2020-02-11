import './jigsaw.css'

let w = 310 // canvas宽度
let h = 155 // canvas高度
const l = 42 // 滑块边长
const r = 9 // 滑块半径
const PI = Math.PI // 圆周率
const L = l + r * 2 + 3 // 滑块实际边长

function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start)
}

function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

function createImg(onload) {
  // 图片实例化
  const img = new Image()
  // h5中有一些元素提供了对cors的支持
  // <audio> <img> <link> <script> <video>
  // anonymous : 对此元素的 CORS 请求将不设置凭据标志
  // use-credentials : 对此元素的CORS请求将设置凭证标志；这意味着请求将提供凭据
  // 默认情况下,即时scr不是同源的,也不会发送cookies ssl证书 http认证交换用户凭据
  img.crossOrigin = 'Anonymous'
  // 注入回调函数
  img.onload = onload
  // 如果图片没有加载成功 将会继续获取下一张图片
  img.onerror = () => {
    img.setSrc(getRandomImgSrc())
  }
  // 设置图片
  img.setSrc = function(src) {
    // 浏览器性能检测
    const isIE = window.navigator.userAgent.indexOf('Trident') > -1
    if (isIE) {
      // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
      const xhr = new XMLHttpRequest()
      xhr.onloadend = function(e) {
        const file = new FileReader() // FileReader仅支持IE10+
        file.readAsDataURL(e.target.response)
        file.onloadend = function(e) {
          img.src = e.target.result
        }
      }
      xhr.open('GET', src)
      xhr.responseType = 'blob'
      xhr.send()
    } else img.src = src
  }

  img.setSrc(getRandomImgSrc())
  return img
}

function createElement(tagName, className) {
  const elment = document.createElement(tagName)
  elment.className = className
  return elment
}

function addClass(tag, className) {
  tag.classList.add(className)
}

function removeClass(tag, className) {
  tag.classList.remove(className)
}

// 从某个不知名网站获取图片
function getRandomImgSrc() {
  return `https://picsum.photos/${w}/${h}/?image=${getRandomNumberByRange(
    0,
    1084
  )}`
}

function draw(ctx, x, y, operation) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
  ctx.lineTo(x + l, y)
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
  ctx.lineTo(x + l, y + l)
  ctx.lineTo(x, y + l)
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
  ctx.lineTo(x, y)
  ctx.lineWidth = 2
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.stroke()
  ctx[operation]()
  ctx.globalCompositeOperation = 'destination-over'
}

function sum(x, y) {
  return x + y
}

function square(x) {
  return x * x
}

class jigsaw {
  constructor({ el, width = 310, height = 155, onSuccess, onFail, onRefresh }) {
    w = width
    h = height
    el.style.position = 'relative'
    el.style.width = w + 'px'
    Object.assign(el.style, {
      position: 'relative',
      width: w + 'px',
      margin: '0 auto'
    })
    this.el = el
    this.onSuccess = onSuccess
    this.onFail = onFail
    this.onRefresh = onRefresh
  }

  init() {
    // 初始化DOM
    this.initDOM()
    // 初始化图片
    this.initImg()
    // 绑定事件
    this.bindEvents()
  }

  initDOM() {
    // 创建画布
    const canvas = createCanvas(w, h) // 画布
    // 创建滑块
    const block = canvas.cloneNode(true) // 滑块
    // 创建滚动容器
    const sliderContainer = createElement('div', 'sliderContainer')
    // 设置滚动容器宽度
    sliderContainer.style.width = w + 'px'
    // 创建刷新元素
    const refreshIcon = createElement('div', 'refreshIcon')
    // 创建滑动遮罩
    const sliderMask = createElement('div', 'sliderMask')
    // 创建滚动条 ?
    const slider = createElement('div', 'slider')
    // 创建滚动图标
    const sliderIcon = createElement('span', 'sliderIcon')
    // 创建滚动文字
    const text = createElement('span', 'sliderText')
    // 添加样式
    block.className = 'block'
    // 添加文字
    text.innerHTML = '向右滑动填充拼图'
    // 缓存根节点
    const el = this.el
    // 根节点添加如下元素
    el.appendChild(canvas)
    el.appendChild(refreshIcon)
    el.appendChild(block)
    // 滚动条添加如下元素
    slider.appendChild(sliderIcon)
    sliderMask.appendChild(slider)
    sliderContainer.appendChild(sliderMask)
    sliderContainer.appendChild(text)
    el.appendChild(sliderContainer)

    // 将属性缓存到oop对象
    Object.assign(this, {
      canvas,
      block,
      sliderContainer,
      refreshIcon,
      slider,
      sliderMask,
      sliderIcon,
      text,
      canvasCtx: canvas.getContext('2d'),
      blockCtx: block.getContext('2d')
    })
  }

  initImg() {
    const img = createImg(() => {
      this.draw()
      this.canvasCtx.drawImage(img, 0, 0, w, h)
      this.blockCtx.drawImage(img, 0, 0, w, h)
      const y = this.y - r * 2 - 1
      const ImageData = this.blockCtx.getImageData(this.x - 3, y, L, L)
      this.block.width = L
      this.blockCtx.putImageData(ImageData, 0, y)
    })
    this.img = img
  }

  draw() {
    // 随机创建滑块的位置
    // 获取起码 [滑块长度 + 10 ,容器长度-滑块长度-10] 的缺块起始位置
    this.x = getRandomNumberByRange(L + 10, w - (L + 10))
    // 这个y是很懂怎么算的
    this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10))
    // 绘制图片
    draw(this.canvasCtx, this.x, this.y, 'fill')
    draw(this.blockCtx, this.x, this.y, 'clip')
  }

  clean() {
    this.canvasCtx.clearRect(0, 0, w, h)
    this.blockCtx.clearRect(0, 0, w, h)
    this.block.width = w
  }
  // 绑定事件
  bindEvents() {
    // 根元素选中事件阻止默认事件
    this.el.onselectstart = () => false
    // 刷新元素点击事件
    this.refreshIcon.onclick = () => {
      this.reset()
      typeof this.onRefresh === 'function' && this.onRefresh()
    }

    let originX, // 原点x
      originY, // 圆点y
      trail = [],
      isMouseDown = false // 按下鼠标状态

    const handleDragStart = function(e) {
      // 记录鼠标移动元素位置
      originX = e.clientX || e.touches[0].clientX
      originY = e.clientY || e.touches[0].clientY
      isMouseDown = true
    }

    // 鼠标移动过程
    const handleDragMove = e => {
      // 如过没有按下鼠标 直接返回 这种情况额 是机械人 ?
      if (!isMouseDown) return false
      // 记录鼠标移动位置
      const eventX = e.clientX || e.touches[0].clientX
      const eventY = e.clientY || e.touches[0].clientY
      // 计算移动距离
      const moveX = eventX - originX
      const moveY = eventY - originY
      // 如果移动距离X小于0? 或者加38 >= w ? 直接退出
      if (moveX < 0 || moveX + 38 >= w) return false
      // 更新滑块移动距离
      this.slider.style.left = moveX + 'px'
      // 更新图片缺块移动距离
      const blockLeft = ((w - 40 - 20) / (w - 40)) * moveX
      this.block.style.left = blockLeft + 'px'
      // 滚动过程中改变滑块容器的样式
      addClass(this.sliderContainer, 'sliderContainer_active')
      // 滑块容器的遮罩显示 蓝色的那一块
      this.sliderMask.style.width = moveX + 'px'
      // 记录移动的y
      trail.push(moveY)
    }

    // 鼠标移动结束
    const handleDragEnd = e => {
      if (!isMouseDown) return false
      // 结束滚动
      isMouseDown = false
      // 记录结束时鼠标x距离
      const eventX = e.clientX || e.changedTouches[0].clientX
      // 如果结束时距离等于原点 结束(这里就是点一下滑块 还需要清理样式)
      if (eventX === originX) return false
      // 清理滚动样式
      removeClass(this.sliderContainer, 'sliderContainer_active')
      // 将trail写入到oop
      this.trail = trail // 拖动y轴轨迹
      //
      const { spliced, verified } = this.verify()
      if (spliced) {
        if (verified) {
          // 验证成功 ?
          addClass(this.sliderContainer, 'sliderContainer_success')
          // 执行验证成功回调
          typeof this.onSuccess === 'function' && this.onSuccess()
        } else {
          addClass(this.sliderContainer, 'sliderContainer_fail')
          this.text.innerHTML = '请再试一次'
          this.reset()
        }
      } else {
        // 验证失败
        addClass(this.sliderContainer, 'sliderContainer_fail')
        // 执行失败回调
        typeof this.onFail === 'function' && this.onFail()
        // 一秒后重置
        setTimeout(() => {
          this.reset()
        }, 1000)
      }
    }
    this.slider.addEventListener('mousedown', handleDragStart)
    this.slider.addEventListener('touchstart', handleDragStart)
    this.block.addEventListener('mousedown', handleDragStart)
    this.block.addEventListener('touchstart', handleDragStart)
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('touchmove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)
  }
  // 校验拖动距离 为啥不用依赖注入的方式 ?
  verify() {
    const arr = this.trail // 拖动时y轴的移动距离
    // 计算每次拖动时 y轴的平均距离
    const average = arr.reduce(sum) / arr.length
    // 计算偏差值
    const deviations = arr.map(x => x - average)
    // 开方
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length)
    // 缺块距离左边的位置
    const left = parseInt(this.block.style.left)
    return {
      spliced: Math.abs(left - this.x) < 10, // 如果偏差小于10像素
      verified: stddev !== 0 // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
    }
  }

  reset() {
    this.sliderContainer.className = 'sliderContainer'
    this.slider.style.left = 0
    this.block.style.left = 0
    this.sliderMask.style.width = 0
    this.clean()
    this.img.setSrc(getRandomImgSrc())
  }
}

window.jigsaw = {
  init: function(opts) {
    return new jigsaw(opts).init()
  }
}
