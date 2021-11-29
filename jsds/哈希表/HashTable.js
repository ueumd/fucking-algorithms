import SinglyLinkedList from '../链表/SinglyLinkedList.js'

/**
 fill()方法的作用是使用一个固定值来替换数组中的元素。该固定值可以是字母、数字、字符串、数组等等。
 fill()方法还有两个可选参数，表示填充的起始位置和结束位置。
 var arr3 = [12,23,34,45,56];
 arr3.fill("hello");
 console.log(arr3)  // ["hello", "hello", "hello", "hello", "hello"]

 Array.from('foo');
 // ["f", "o", "o"]

 array.reduce(function(total, currentValue, currentIndex, arr), initialValue)


 参数	描述
 function(total,currentValue, index,arr)	必需。用于执行每个数组元素的函数。
 函数参数:
 参数	            描述
 total	          必需。初始值, 或者计算结束后的返回值。
 currentValue	    必需。当前元素
 currentIndex	    可选。当前元素的索引
 arr	            可选。当前元素所属的数组对象。
 */

const defaultHashTableSize = 32

export default class HashTable {

  constructor (hashTabsize = defaultHashTableSize) {
    this.buckets = Array(hashTabsize).fill(null).map(() => new SinglyLinkedList())
    this.keys = {}
  }

  hash (key) {
    const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)), 0,)

    return hash % this.buckets.length
  }

  put (key, value) {
    const keyHash = this.hash(key)
    this.keys[key] = keyHash
    const bucketLinkedList = this.buckets[keyHash]

    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key })

    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.element.value = value;
    }

    return this
  }

  delete(key) {
    const keyHash = this.hash(key)
    delete this.keys[key]
    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key })

    if (node) {
      return bucketLinkedList.delete(node.element.key)
    }

    return null
  }


  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)]
    const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key })

    return node ? node.element.value : undefined
  }

  has (key) {
    return Object.hasOwnProperty.call(this.keys, key)
  }

  getKesy() {
    return Object.keys(this.keys)
  }

}