class EventEmitter {
  constructor() {
    this.cache = {}
  }

  register(type, cb) {
    if (typeof cb !== 'function') {
      throw new Error('EventEmitter error : callback must be a function')
    }
    if (Array.isArray(this.cache[type])) {
      this.cache[type].push(cb)
    } else {
      this.cache[type] = [cb]
    }
    return () => {
      this.remove(type, cb)
    }
  }

  emit(type, ...args) {
    if (Array.isArray(this.cache[type])) {
      for (let cb of this.cache[type]) {
        cb.call(null, ...args)
      }
    } else {
      throw new Error(
        `EventEmitter error : emit type ${type} is undefined in cache `
      )
    }
  }

  remove(type, fn) {
    if (Array.isArray(this.cache[type])) {
      let len = this.cache[type].length,
        index = -1
      while (--len > -1) {
        if (fn === this.cache[type][len]) {
          index = len
          break
        }
      }
      if (index > -1) {
        this.cache[type].splice(index, 1)
      } else {
        throw new Error(
          `EventEmitter error : remove callback isn't found in cache[${type}]`
        )
      }
    } else {
      throw new Error(
        `EventEmitter error : remove type ${type} is undefined in cache `
      )
    }
  }
}

export default new EventEmitter()
