# 数据结构与算法-Set

在高中数学中第一课就是集合，一种数学概念。<br />通常用大写字母如A,B,S,T,...表示集合，而用小写字母如a,b,x,y,...表示集合的元素。若x是集合S的元素，则称x属于S，记为x∈S。若y不是集合S的元素，则称y不属于S，记为y∉S 。<br />
<br />在计算机中，集合(set)是一种包含不同元素的数据结构。<br />集合中的元素称为成员。<br />以 [value, value] 的形式储存元素
<a name="rC5cN"></a>
## 集合的两个最重要的特性是

1. 集合中的成员是**无序的**
1. 集合中**不允许相同成员存在**

<br />
<a name="ZVCFW"></a>
## 集合的定义

- 不包含任何成员的集合称为 _空集_, _全集_ 则是包含一切可能成员的集合.
- 如果两个集合的成员完全相同, 则称两个集合相等.
- 如果一个集合中所有的成员都属于另外一个集合, 则前一集合称为后一集合的子集.

<br />
<a name="EZa05"></a>
## 对集合的操作
对集合的基本操作有下面几种

- _并集_ : 将两个集合中的成员进行合并, 得到一个新的集合
- _交集_ : 两个集合中共同存在的成员组成一个新的集合
- _补集_ : 属于一个集合而不属于另一个集合的成员组成的集合


<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/357813/1587697423985-b04d4b4e-5750-4aa0-97b2-1e71be6fe774.png#align=left&display=inline&height=163&margin=%5Bobject%20Object%5D&name=image.png&originHeight=326&originWidth=1154&size=45257&status=done&style=none&width=577)<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/357813/1587697446560-15d3e955-52b3-4caa-81ad-061a17e76bf6.png#align=left&display=inline&height=155&margin=%5Bobject%20Object%5D&name=image.png&originHeight=310&originWidth=1344&size=48239&status=done&style=none&width=672)<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/357813/1587697461996-62ddc268-58be-4820-b154-3d268e9d98f0.png#align=left&display=inline&height=163&margin=%5Bobject%20Object%5D&name=image.png&originHeight=326&originWidth=1238&size=49457&status=done&style=none&width=619)
<a name="skJtM"></a>
## 模拟ES6 Set
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
  /**
   Set.prototype.constructor：构造函数，默认就是Set函数。
   Set.prototype.size：返回Set实例的成员总数。


   Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
   Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
   Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
   Set.prototype.clear()：清除所有成员，没有返回值。

   Set.prototype.values()：返回键值的遍历器
   */

    // 模拟ES6 Set

  class Set2 {
    constructor() {
      this.items = {}
    }

    /**
     * 元素是否存在
     * @param value
     * @returns {boolean|*}
     */
    has(value) {
      return this.items.hasOwnProperty(value)
    }

    /**
     * 集合是不能重复的
     * @param value
     * @returns {boolean|*}
     */
    add(value) {
      if (this.has(value)) return false

      this.items[value] = value
      return value
    }

    remove() {
      if (this.has(value)) {
        delete this.items[value]
        return true
      }
      // 不存在 返回false
      return false
    }

    size() {
      // let count = 0
      // for (let item in this.items) {
      //   if (this.items.hasOwnProperty(item)) count ++
      // }
      // return count

      return Object.keys(this.items).length
    }

    clear() {
      this.items = {}
    }

    // 返回键值的遍历器
    values() {
      let values = []
      for (let i in this.items) {
        if (this.items.hasOwnProperty(i)) {
          values.push(this.items[i])
        }
      }
      return values
    }

    /**
     * 并集
     * A = {1, 2}
     * B = {2, 3}
     *
     * A.union(B) = {1, 2, 3}
     * @returns {Set2}
     */
    union(otherSet) {
      let resultSet = new Set2()

      // 提取自己的值
      let arr = this.values()
      for (var i = 0; i < arr.length; i++) {
        resultSet.add(arr[i])
      }

      // 提取目标的值
      arr = otherSet.values()
      for (var i = 0; i < arr.length; i++) {
        resultSet.add(arr[i])
      }
      return resultSet
    }

    /**
     * 交集
     * A = {1 ,2}
     * B = {2 ,3}
     * A.intersection(B)={2}
     * @param otherSet
     * @returns {Set2}
     */
    intersection(otherSet) {
      let resultSet = new Set2()

      let arr = this.values()

      for (let i = 0; i < arr.length; i++) {
        if (otherSet.has(arr[i])) {
          resultSet.add(arr[i])
        }
      }
      return resultSet
    }

    /**
     * 差集
     * A = {1 ,2}
     * B = {2 ,3}
     * A.difference(B)={1}
     * @param otherSet
     * @returns {Set2}
     */
    difference(otherSet) {
      let resultSet = new Set2()
      let arr = this.values()
      for (var i = 0; i < arr.length; i++) {
        if (otherSet.has(arr[i])) {
          // B中有 添加？ 不添加！
        } else {
          resultSet.add(arr[i])
        }
      }

      return resultSet
    }
  }


  let A = new Set2()
  A.add(1)
  A.add(2)
  A.add(3)

  let B = new Set2()
  B.add(2)
  B.add(3)
  B.add(4)

  console.log(A) // items: {1: 1, 2: 2, 3: 3}
  console.log(B) // items: {2: 2, 3: 3, 4: 4}

  A.size() //3

  A.union(B) // {items: {1: 1, 2: 2, 3: 3, 4: 4}}

  A.intersection(B) // items: {2: 2, 3: 3}

  A.difference(B) // items: {1: 1}

</script>
</body>
</html>

```


<a name="ULiKm"></a>
# ES6 Set
> 以下内容 摘自 阮一峰《ECMAScript 6 入门》 [Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)



<a name="73UoL"></a>
## Set
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。<br />`Set`本身是一个构造函数，用来生成 Set 数据结构。
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
  let set = new Set()

  set.add(1)  // Set [ 1 ]
  set.add(5)  // Set [ 1, 5 ]
  set.add('A')
  set.add('B')
  set.add({name: 'set'})


  /**
   set
   Set(5) {1, 5, "A", "B", {…}}
   [[Entries]]
   0: 1
   1: 5
   2: "A"
   3: "B"
   4: value: {name: "set"}
   size: 5
   __proto__: Set
   */


  /*
   Set.prototype.keys()：   返回 键名     的遍历器
   Set.prototype.values()： 返回 键值     的遍历器
   Set.prototype.entries()：返回 键值对   的遍历器
   Set.prototype.forEach()：使用回调函数遍历每个成员
   */

  
  // 遍历返回值
  for (let j of set) {
    console.log(j)

    /**
      1
      5
      A
      B
      {name: "set"}
     */
  }

  let entries = set.entries() // SetIterator {1 => 1, 5 => 5, "A" => "A", "B" => "B", {…} => {…}}

  for (let i of set.entries()) {
    console.log(Array.isArray(i), i)
    /**
     true (2) [1, 1]
     true (2) [5, 5]
     true (2) ["A", "A"]
     true (2) ["B", "B"]
     true (2) [{…}, {…}]
     */
  }

  for (let i of set.values()) {
    console.log(i)
    /**
     true (2) [1, 1]
     true (2) [5, 5]
     true (2) ["A", "A"]
     true (2) ["B", "B"]
     true (2) [{…}, {…}]
     */
  }

  for (let i of set.keys()) {
    console.log(i)
    /**
     true (2) [1, 1]
     true (2) [5, 5]
     true (2) ["A", "A"]
     true (2) ["B", "B"]
     true (2) [{…}, {…}]
     */
  }

  set.forEach((i, it )=> {
    console.log(i, it)
    /*
    1 1
    5 5
    A A
    B B
   {name: "set"} {name: "set"}
     */
  })


</script>
</body>
</html>

```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/357813/1587713681332-47d214a1-0585-4539-81a4-dbc46bc74ad2.png#align=left&display=inline&height=473&margin=%5Bobject%20Object%5D&name=image.png&originHeight=946&originWidth=748&size=92641&status=done&style=none&width=374)<br />

```javascript
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4

// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 去除数组的重复成员
[...new Set([2, 3, 5, 4, 5, 2, 2])] // [2, 3, 5, 4]

[...new Set('ababbc')].join('')     // "abc"

```

<br />

<a name="zivFj"></a>
### Set 实例的属性和方法
Set 结构的实例有以下属性。

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
- `Set.prototype.size`：返回`Set`实例的成员总数。


<br />Set 操作方法

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。


<br />Set 结构的实例有四个遍历方法，可以用于遍历成员。

- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员


<br />ES6 实现并集、交集、差集
```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```


<a name="WeakSet"></a>
## WeakSet
WeakSet 结构与 Set 类似，也是不重复的值的集合。

1. 成员都是对象
1. 成员都是弱引用，随时可以消失。 可以用来保存DOM节点，不容易造成内存泄漏
1. 不能遍历，方法有add, delete,has


<br />但是，它与 Set 有两个区别。

- WeakSet 的**成员只能是对象**，而不能是其他类型的值。
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

<br />
<a name="daAgi"></a>
### 语法
WeakSet 是一个构造函数，可以使用`new`命令，创建 WeakSet 数据结构。
```javascript
const ws = new WeakSet();
```
作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。<br />

```javascript
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```
上面代码中，**a是一个数组，它有两个成员，也都是数组**。<br />将a作为 WeakSet 构造函数的参数，a的成员会自动成为 WeakSet 的成员。<br />
<br />注意，是`a`数组的成员成为 WeakSet 的成员，而不是`a`数组本身。这意味着，数组的成员只能是对象。
```javascript
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```
上面代码中，**数组b的成员不是对象**，加入 WeakSet 就会报错。

WeakSet 结构有以下三个方法

- **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员。
- **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员。
- **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。


<br />也就是说WeakSet不能遍历。因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。<br />
<br />WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。<br />下面是 WeakSet 的另一个例子。
```javascript
const foos = new WeakSet()

class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
```

<br />上面代码保证了`Foo`的实例方法，只能在`Foo`的实例上调用。这里使用 WeakSet 的好处是，`foos`对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑`foos`，也不会出现内存泄漏。<br />
<br />下面是一个例子。
```javascript
const ws = new WeakSet();
const obj = {};
const foo = {};
ws.add(window);
ws.add(obj);
ws.has(window); // true
ws.has(foo);    // false
ws.delete(window);
ws.has(window);    // false
```

<br />WeakSet 没有`size`属性，没有办法遍历它的成员。<br />

```javascript
ws.size // undefined
ws.forEach // undefined
ws.forEach(function(item){ console.log('WeakSet has ' + item)})
// TypeError: undefined is not a function
```

<br />上面代码试图获取`size`和`forEach`属性，结果都不能成功。<br />
<br />Github: [Ueumd](http://github.com/ueumd/blog/tree/master/数据结构)
