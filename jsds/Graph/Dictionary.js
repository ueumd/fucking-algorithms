export default class Dictionary {
  constructor() {
    this.items = {}
  }

  set(key, value) {
    this.items[key] = value
  }

  get(key) {
    return this.items[key]
  }

  remove(key) {
    delete this.items[key]
  }

  get keys() {
    return Object.keys(this.items)
  }

  get values() {

    /*
    也可以使用ES7中的values方法
    return Object.values(this.items)
    */

    // 在这里我们通过循环生成一个数组并输出
    return Object.keys(this.items).reduce((r, c, i) => {
      r.push(this.items[c])
      return r
    }, [])
  }
}
