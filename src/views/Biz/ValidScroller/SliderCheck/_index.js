import './index.scss'
import get from 'lodash/get'
import request from '@u/request'
function createElement(tag, config) {
  const DOM = document.createElement(tag)
  for (let key in config) {
    if (key === 'className') {
      DOM.className = config[key]
    } else {
      DOM.setAttribute(key, config[key])
    }
  }
  return DOM
}

function addClass(DOM, className) {
  DOM.classList.add(className)
}
function removeClass(DOM, className) {
  DOM.classList.remove(className)
}

class ValidScroll {
  constructor(opt, el) {
    Object.assign(this, { opt, el })
  }

  async getData() {
    const url = get(this, 'opt.url')
    if (!url) {
      throw new Error('url is nesseary')
    }
    const {} = await request({
      url,
      method: 'get'
    })
  }

  initEl() {
    addClass(this.el, 'valid-wraper')
    this.el.style.width = this.opt.w + 'px'
  }

  initDOM() {
    // 创建画布
    const canvas = createElement('canvas', { className: 'canvas' })
    // 创建滑块容器
    const sliderContainer = createElement('div', {
      className: 'sliderContainer'
    })
    // 创建滑块
    const slider = createElement('div', { className: 'slider' })
    // 创建滚动条文字
    const text = createElement('p', { className: 'text' })
    text.innerHTML = '向右滑动填充拼图'
    // 创建滑块遮罩
    const mask = createElement('div', { className: 'mask' })
    // 创建裁剪块
    const block = createElement('img', {
      src: this.opt.slice,
      className: 'block'
    })
    block.style.top = this.opt.posY + 'px'
    block.style.left = this.opt.posX + 'px'
    // 合并到oop实例
    Object.assign(this, {
      canvas,
      sliderContainer,
      slider,
      text,
      mask,
      block
    })
  }

  initCanvas() {
    const { w, h, image, a } = this.opt
    this.canvas.setAttribute('width', w)
    this.canvas.setAttribute('height', h)
    const ctx = this.canvas.getContext('2d')
    // 计算裁剪量
    const _CutX = Math.floor(w / 10)
    const _CutY = Math.floor(h / 2)
    const img = document.createElement('img')
    img.setAttribute('src', image)
    img.onload = () => {
      // 开始绘制
      for (let i = 0; i < a.length; i++) {
        let x, y
        // 横坐标
        x = a[i] > 9 ? (a[i] - 10) * _CutX : a[i] * _CutX
        // 纵坐标
        y = a[i] > 9 ? _CutY : 0
        let xx, yy
        // 横坐标
        xx = i > 9 ? (i - 10) * _CutX : i * _CutX
        // 纵坐标
        yy = i > 9 ? _CutY : 0
        ctx.drawImage(img, xx, yy, _CutX, _CutY, x, y, _CutX, _CutY)
      }
    }
  }

  showSuccess() {
    const successContainer = createElement('div', { className: 'success-mask' })
    const successText = createElement('span', {
      className: 'success-mask-text'
    })
    successText.innerHTML = '验证通过'
    successContainer.appendChild(successText)
    this.el.appendChild(successContainer)
  }

  display() {
    this.el.appendChild(this.canvas)
    this.el.appendChild(this.block)
    this.sliderContainer.appendChild(this.slider)
    this.sliderContainer.appendChild(this.text)
    this.sliderContainer.appendChild(this.mask)
    this.el.appendChild(this.sliderContainer)
  }

  bindEvent() {
    const { w } = this.opt
    // 防止选中元素拖拽
    this.el.onselectstart = () => false
    let originX, // 原点x
      originY, // 原点y
      hasTouch = false // 开始触摸了
    const dragStart = e => {
      // 记录鼠标移动元素位置
      originX = e.clientX || e.touches[0].clientX
      originY = e.clientY || e.touches[0].clientY
      hasTouch = true
    }
    const dragMove = e => {
      if (!hasTouch) return
      // 记录鼠标移动位置
      const eventX = e.clientX || e.touches[0].clientX
      const eventY = e.clientY || e.touches[0].clientY
      // 计算移动距离
      const moveX = eventX - originX
      const moveY = eventY - originY
      // 如果移动距离X小于0? 或者加38 >= w ? 直接退出
      if (moveX < 0 || moveX + 38 >= w) return false
      this.slider.style.left = moveX + 'px'
      this.block.style.left = moveX + 'px'
      this.text.style.visibility = 'hidden'
      addClass(this.sliderContainer, 'sliderContainer_active')
      // 滑块容器的遮罩显示 蓝色的那一块
      this.mask.style.width = moveX + 'px'
    }
    const dragEnd = async e => {
      if (!hasTouch) return
      hasTouch = false
      // 记录结束时鼠标x距离
      const eventX = e.clientX || e.changedTouches[0].clientX
      removeClass(this.sliderContainer, 'sliderContainer_active')
      // 发送ajax请求验证
      const { success } = await this.opt.onSubmit({
        posX: eventX - originX
      })
      if (success) {
        // 成功
        console.log('成功了')
        this.showSuccess()
      } else {
        // 失败
        this.onReset()
      }
    }
    this.slider.addEventListener('mousedown', dragStart)
    this.slider.addEventListener('touchstart', dragStart)
    document.addEventListener('mousemove', dragMove)
    document.addEventListener('touchmove', dragMove)
    document.addEventListener('mouseup', dragEnd)
    document.addEventListener('touchend', dragEnd)
  }

  onReset() {
    this.slider.style.left = 0
    this.block.style.left = 0
    this.mask.style.width = 0
    this.text.style.visibility = 'visible'
  }

  init() {
    this.initDOM()
    this.initEl()
    this.initCanvas()
    this.bindEvent()
    this.display()
  }
}

/* const ValidScroll = function(opt, el) {
  function bindEvents({ el, slider, sliderContainer, mask }) {
    // 防止元素选中拖拽
    el.onselectstart = () => false
    let originX, // 原点x
      originY, // 原点y
      hasTouch = false
    const dragStartHandler = function(e) {
      // 记录鼠标移动元素位置
      originX = e.clientX || e.touches[0].clientX
      originY = e.clientY || e.touches[0].clientY
      hasTouch = true
    }
    const dragMoveHandler = function(e) {
      if (!hasTouch) return
      // 记录鼠标移动位置
      const eventX = e.clientX || e.touches[0].clientX
      const eventY = e.clientY || e.touches[0].clientY
      // 计算移动距离
      const moveX = eventX - originX
      const moveY = eventY - originY
      // 如果移动距离X小于0? 或者加38 >= w ? 直接退出
      if (moveX < 0 || moveX + 38 >= w) return false
      slider.style.left = moveX + 'px'
      sliderContainer.className += ' sliderContainer_active'
      // 滑块容器的遮罩显示 蓝色的那一块
      mask.style.width = moveX + 'px'
    }
    const dragEndHandler = function(e) {
      if (!hasTouch) return
      hasTouch = false
      // 记录结束时鼠标x距离
      const eventX = e.clientX || e.changedTouches[0].clientX
      sliderContainer.className = sliderContainer.className.replace(
        ' sliderContainer_active',
        ''
      )
      // 发送ajax请求
      const ramdom = parseInt(Math.random() * 5)
      if (ramdom > 3) {
      }
    }
    slider.addEventListener('mousedown', dragStartHandler)
    slider.addEventListener('touchstart', dragStartHandler)
    document.addEventListener('mousemove', dragMoveHandler)
    document.addEventListener('touchmove', dragMoveHandler)
    document.addEventListener('mouseup', dragEndHandler)
    document.addEventListener('touchend', dragEndHandler)
  }

  const { w, h, bg } = opt
  el.style.width = w + 'px'
  // 创建画布
  const canvas = document.createElement('canvas')
  // 创建图片
  const img = document.createElement('img')
  // 创建滚动容器
  const sliderContainer = document.createElement('div')
  sliderContainer.className = 'sliderContainer'
  sliderContainer.style.width = w + 'px'

  // 创建滚动按钮
  const slider = document.createElement('div')
  slider.className = 'slider'
  // 创建滚动条文字
  const text = document.createElement('p')
  text.className = 'text'
  text.innerHTML = '向右滑动填充拼图'
  // 创建滑块遮罩
  const mask = document.createElement('div')
  mask.className = 'mask'

  canvas.setAttribute('width', w)
  canvas.setAttribute('height', h)
  const ctx = canvas.getContext('2d')

  img.setAttribute('crossOrigin', 'Anonymous')
  img.setAttribute('src', bg)
  img.onload = function() {
    ctx.drawImage(img, 0, 0, w, h)
  }

  bindEvents({ el, canvas, slider, sliderContainer, mask })
  el.appendChild(canvas)
  sliderContainer.appendChild(slider)
  sliderContainer.appendChild(text)
  sliderContainer.appendChild(mask)
  el.appendChild(sliderContainer)
}
 */
// 图片地址 https://picsum.photos/310/180
/*
 * { 
    bg : '',  // 图片地址
    w : '', // 图片宽度
    h : ''  // 图片高度
   }
 */

export default function(opt, el) {
  new ValidScroll(opt, el).init()
}
