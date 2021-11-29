# 数据结构与算法-Map

> 与Set类似，ES6同样实现了一个Map类，即我们所说的字典

<a name="zffZ5"></a>
# 字典(Dictionary)
是一种以 键-值对 形式存储数据的数据结构 ，就如同我们平时查看通讯录一样，要找一个电话，首先先找到该号码的机主名字，名字找到了，紧接着电话号码也就有了。<br />
<br />这里的键就是你用来查找的东西，本例中指代的就是名字，值就是查找得到的结果，也就是对应的电话号码。<br />
<br />在JavaScript 中的 Object 类就是以字典的形式设计的，下面我们将会借助 Object 类的特性，自主实现一个 Dictionary 类，让这种字典类型的对象使用起来更加方便。<br />

<a name="9jnmO"></a>
### 代码实现
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
  class Dictionary {
    constructor() {
      this.items = {}
    }

    // 检查键是否存在
    has(key) {
      // return items.hasOwnProperty(key)
      return key in this.items
    }

    set(key, value) {
      this.items[key] = value
    }

    delete(key) {
      if (this.has(key)) {
        delete this.items[key]
        return true
      }
      return false
    }

    get(key) {
      if (this.has(key)) {
        return this.items[key]
      }
      return undefined
    }

    getItems() {
      return this.items
    }
  }

  let dic = new Dictionary()
  dic.set('AAA', 13012345678)
  dic.set('BBB', 13112345678)
  dic.set('CCC', 13012345678)

  /**
   * dic
   Dictionary {items: {…}}
       items:
           AAA: 13012345678
           BBB: 13112345678
           CCC: 13012345678
   */

</script>
</body>
</html>

```


<a name="g6olj"></a>
# 集合 与 字典 的区别
通过上面代码我们可以回顾，先总结下<br />相同点：

- 集合 元素不能重复
- 字典 key不能重复，但存储的值可以重复


<br />不同点：

- 集合 是以 [value, value] 的形式储存元素
- 字典 是以 [key, value] 的形式储存



<a name="fq8CR"></a>
# ES6中的Map
> 以下内容 摘自 阮一峰 [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/set-map)


<br />JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。<br />这给它的使用带来了很大的限制。
```javascript
const data = {};
const element = document.getElementById('myDiv');
data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
```

<br />上面代码原意是将一个 DOM 节点作为对象`data`的键，但是由于对象只接受字符串作为键名，所以`element`被自动转为字符串`[object HTMLDivElement]`。<br />
<br />为了解决这个问题，ES6 提供了 Map 数据结构。<br />它类似于对象，也是键值对的集合，**但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键**。<br />也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。<br />
<br />如果你需要“键值对”的数据结构，Map 比 Object 更合适。<br />

<a name="qB0Mb"></a>
## 实例的属性和操作方法
<a name="5XYlZ"></a>
### size属性
> 返回 Map 结构的成员总数。

<a name="KDTp3"></a>
### Map.prototype.set(key, value)
> set方法设置键名key对应的键值为value，然后返回整个 Map 结构。
> 如果key已经有值，则键值会被更新，否则就新生成该键。

<a name="aCoOi"></a>
### Map.prototype.get(key)
> get方法读取key对应的键值，如果找不到key，返回undefined。

<a name="gkRMV"></a>
### Map.prototype.has(key)
> has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

<a name="3dsZZ"></a>
### Map.prototype.delete(key)
> delete方法删除某个键，返回true。如果删除失败，返回false。

<a name="rpZYs"></a>
### Map.prototype.clear()
> clear方法清除所有成员，没有返回值。



<a name="HkiwV"></a>
## 遍历方法 
Map 结构原生提供三个遍历器生成函数和一个遍历方法。
<a name="WdH6q"></a>
### Map.prototype.keys()
返回键名的遍历器。
<a name="AcTfA"></a>
### Map.prototype.values()
返回键值的遍历器。
<a name="vJn2F"></a>
### Map.prototype.entries()
返回所有成员的遍历器。
<a name="jtv5V"></a>
### Map.prototype.forEach()
遍历 Map 的所有成员。<br />
<br />示例：
```javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```
```javascript
  const m = new Map()
  const o = {p: 'Hello World'}

  m.set(o, 'content') // 把o对象作业键
  m.get(o)  // "content"

  m.set('city', '上海')

  m.has(o)    // true
 // m.delete(o) // true
 // m.has(o)    // false
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/357813/1587810628996-86b88da0-c025-4bca-b002-27b0f4b3c695.png#align=left&display=inline&height=311&margin=%5Bobject%20Object%5D&name=image.png&originHeight=622&originWidth=780&size=57632&status=done&style=none&width=390)
<a name="KDCvq"></a>
## Map构造函数 接受数组 作为参数
```javascript
// 传入的是一个二维数组 
const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]);

  map.size // 2
  map.has('name') // true
  map.get('name') // "张三"
  map.has('title') // true
  map.get('title') // "Author"
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/357813/1587811266514-d711a69e-7e24-4b13-b702-da3d6d3bee89.png#align=left&display=inline&height=224&margin=%5Bobject%20Object%5D&name=image.png&originHeight=448&originWidth=816&size=41602&status=done&style=none&width=408)<br />Map 构造函数接受数组作为参数，实际上执行的是下面的算法。
```javascript
const items = [
  ['name', '张三'],
  ['title', 'Author']
];
const map = new Map();
items.forEach(
  ([key, value]) => map.set(key, value)
);
```

<br />事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作`Map`构造函数的参数。这就是说，`Set`和`Map`都可以用来生成新的 Map。<br />

```javascript
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]])
const m3 = new Map(m2)

m3.get('baz') // 3
```

<br />上面代码中，我们分别使用 Set 对象和 Map 对象，当作`Map`构造函数的参数，结果都生成了新的 Map 对象。<br />

<a name="1quvm"></a>
## key
> 不能重复

如果对同一个键多次赋值，后面的值将覆盖前面的值。<br />

```javascript
const map = new Map();
map
.set(1, 'aaa')
.set(1, 'bbb');
map.get(1) // "bbb"
```

<br />上面代码对键`1`连续赋值两次，后一次的值覆盖前一次的值。<br />

```javascript
new Map().get('asfddfsasadf')
// undefined
```
如果读取一个未知的键，则返回`undefined`。<br />

<a name="30flq"></a>
### 对象作为Key


```javascript
const map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined
```

<br />上面代码的`set`和`get`方法，表面是针对同一个键，但实际上这是** 两个不同的数组实例**，**内存地址是不一样的**，因此`get`方法无法读取该键，返回`undefined`。

同样的值的两个实例，在 Map 结构中被视为两个键。
```javascript
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```

<br />上面代码中，变量`k1`和`k2`的值是一样的，但是它们在 Map 结构中被视为两个键。<br />
<br />由上可知，Map 的键实际上是跟**内存地址绑定**的，只要内存地址不一样，就视为两个键。<br />即值可以重复，但键值不可以复重。

这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。<br />

<a name="QbSEg"></a>
### 简单类型的值作为Key
如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。<br />
<br />另外，`undefined`和`null`也是两个不同的键。<br />虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。
```javascript
let map = new Map();
map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123
```

<br />

<a name="r17Ic"></a>
## Map 结构转为数组结构<br /> 
```javascript
 // Map 结构转为数组结构

  const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ])

  console.log([...map.keys()])      // [1,2,3]
  console.log([...map.values()])    // ['one', 'two', 'three']
  console.log([...map.entries()])   // [[1,'one'], [2, 'two'], [3, 'three']]
  console.log([...map])             // [[1,'one'], [2, 'two'], [3, 'three']]
```
详细的可以看 阮一峰 《ECMAScript 6 入门》 [Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map) 一章
<a name="WyCdf"></a>
# WeakMap
<a name="VnXQb"></a>
## 语法含义

- `WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。
- `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。
- `WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。没有size属性，也没有遍历操作。

<br />
```javascript
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();

const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"
```


<a name="H4HDP"></a>
## 设计目的
`weakMap`的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。

```javascript
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
```

<br />上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。<br />这就形成了**arr 对 e1 和 e2 的引用**。<br />
<br />一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放`e1`和`e2`占用的内存。
```javascript
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

<br />上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。<br />
<br />WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。<br />因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。 无需手动清除。

```javascript
const wm = new WeakMap();
const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

<br />上面的 DOM 节点对象的引用计数是`1`，而不是`2`。<br />这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。<br />Weakmap 保存的这个键值对，也会自动消失。

WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

详细的可以看 阮一峰 《ECMAScript 6 入门》 [Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map) 一章<br />

<a name="Mfnri"></a>
# LRU算法
使用map实现LRU算法。算法详细说明可以看 [LRU 算法在 Vue 中 keep-alive 的实现](https://www.yuque.com/ueumd/nyhx/lru)
```javascript
/**
   算法实现
   1. 新数据直接插入到列表头部
   2. 缓存数据被命中，将数据移动到列表头部
   3. 缓存已满的时候，移除列表尾部数据
   */

  class LRUCache {
    constructor(capacity){
      // 缓存容量
      this.capacity = capacity
      this.map = new Map()
    }

    /**
     * @param key
     */
    get(key){
      let value = this.map.get(key)

      // 不存在返回 -1
      if (typeof value === 'undefined') return -1

      // 2. 缓存数据被命中，将数据移动到列表头部
      this.map.delete(key)
      this.map.set(key, value)

      return value
    }

    /**
     * @param key
     * @param value
     */
    put(key, value) {

      // 已存在相同的key先删除，保证key唯一
      if(this.map.has(key)) {
        this.map.delete(key)
      }

      // 1. 新数据直接插入到列表头部
      this.map.set(key, value)

      // 返回键名的遍历器
      let it = this.map.keys()

      // 3. 缓存已满的时候，移除列表尾部数据
      while(this.map.size > this.capacity) {
        this.map.delete(it.next().value)
      }
    }
  }

  let cache = new LRUCache(5)
  cache.put(1, 1)
  cache.put(2, 2)
  cache.put(3, 3)
  cache.put(4, 4)
  cache.put(5, 5)

  // 插入6时 1被删除
  cache.put(6, 6)

  /**
   控制台打印
   cache
   LRUCache {capacity: 5, map: Map(5)}
       capacity: 5
       map: Map(5)
           [[Entries]]
           0: {2 => 2}
           1: {3 => 3}
           2: {4 => 4}
           3: {5 => 5}
           4: {6 => 6}
           size: (...)
       __proto__: Map
       __proto__: Object
   */

   // 访问3时
   cache.get(3)

  /**
   cache
   LRUCache {capacity: 5, map: Map(5)}
       capacity: 5
       map: Map(5)
           [[Entries]]
           0: {2 => 2}
           1: {4 => 4}
           2: {5 => 5}
           3: {6 => 6}
           4: {3 => 3}
           size: (...)
       __proto__: Map
       __proto__: Object
    */
```

<br />全部代码在 [github 数据结构 ](https://github.com/ueumd/blog/tree/master/数据结构)
