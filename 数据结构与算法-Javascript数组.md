# 数据结构与算法-Javascript数组


<br />数组是一种线性表数据结构，它用一组连续的内存空间，来存储一组具有相同类型的数据（JS里可以是任意类型）。<br />关键点：连续的存储空间（数组可以进行随机访问）<br />

<a name="fxBze"></a>
# 声明
```javascript
// js
let data = []

// c
int data[200] = { 0 };  // 编译时 就已经确定所有的值为零

// java
int data[] = new int[3]; // 开辟了一个长度为3的数组
```


<a name="BT2Vv"></a>
# 数组常用的方法
在Chrome控制台输入 `console.dir(Array)` 查看，可以看到属性length, 静态方法from(), isArray，原型prototype上有很多实列方法<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/357813/1587522332761-8e04f645-53af-4855-853b-e59dda8dcd7d.png#align=left&display=inline&height=888&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1776&originWidth=1662&size=282572&status=done&style=none&width=831)
<a name="uajEz"></a>
## 常用的方法
| 方法 | 作用 | 返回值 |
| --- | --- | --- |
| push(x, y, z) | 在数组末尾添加x, y, z | 新数组长度 |
| pop() | 移除数组最后一项 | 移除的最后一项 |
|  |  |  |
| unshift(x, y, z) | 在数组前端添加x, y, z | 新数组长度 |
| shift() | 移除数组第一项 | 移除的第一项 |
|  |  |  |
| reverse() | 反转数组 | 反转后的新数组 |
| sort() | 对数组中每一项的字符串进行升序排列 | 重新排序后的数组 |
|  |  |  |
| concat(a,b,c) | 连接数组 | 连接好的新数组 |
| splice(i,h,..item1) | i位置 h数量 item要添加的元素,空不添加 | 返回被修改的内容<br />此方法会改变原数组 |
| slice(1,n) | 截取数组，从1到n，1和n为索引值 | 返回截取的数组(在这里返回从1开始，到n之前结束) |
|  |  |  |
| indexOf(a，start) | 查找a的所在的位置，从start开始 | 返回a所在的索引值，如果没有查找到则返回-1 |
| lastIndexOf(a,atart) | 与indexOf相反，lastIndexOf从末尾开始查找 | 返回a所在的索引值，如果没有查找到则返回-1 |
| includes() | 数组是否包含某个元素 ['A'].includes('A') | 返回布尔 |
|  |  |  |
| from | 对象转为真正的数组 | 返回转换后的新数组 |
|  |  |  |



<a name="RuPlV"></a>
# 遍历方法
js中遍历数组并不会改变原始数组的方法总共有12个:
```javascript
ES5：
    forEach、every 、some、 filter、map、reduce、reduceRight
ES6：
    find、findIndex、keys、values、entries
```


<a name="qHVJ2"></a>
#### 规则
1. 对于空数组是不会执行回调函数的<br />2. 对于已在迭代过程中删除的元素，或者空元素会跳过回调函数<br />3. 遍历次数再第一次循环前就会确定，再添加到数组中的元素不会被遍历。<br />4. 如果已经存在的值被改变，则传递给 callback 的值是遍历到他们那一刻的值。<br />
<br />
<br />列举几个常用的遍历方法
<a name="vcnN6"></a>
## forEach
对数组的每个元素执行一次给定的函数<br />

- 无法中途退出循环，只能用return退出本次回调，进行下一次回调。
- 无返回值
```javascript
    let a = [1, 2, ,3]; // 最后第二个元素是空的，不会遍历(undefined、null会遍历)
    let obj = { name: 'OBKoro1' }
    
    let result = a.forEach( (value, index, array) => { 
      a[3] = '改变元素';
      a.push('添加到尾端，不会被遍历')
      console.log(value, 'forEach传递的第一个参数'); // 分别打印 1 ,2 ,改变元素
      // break; // break会报错
      return value; // return只能结束本次回调 会执行下次回调
      console.log('不会执行，因为return 会执行下一次循环回调')
    })
    
    console.log(result); // 即使return了一个值, 也还是返回undefined
    // 回调函数也接受接头函数写法

```
<a name="ULoQB"></a>
## map

- 对数组的每个元素进行一定操作（映射）后，会返回一个新的数组
- callback需要有return值，如果没有，返回的全是undefined


<br />示例：
```javascript
   let arr = [
    {domain: "baidu.com", name: "百度"},
    {domain: "taobao.com", name: "淘宝"},
    {domain: "qq.com", name: "腾讯"},
  ]

  // 不使用map

  function getNewArr() {
    let newArr = []
    for (var i = 0, l = arr.length; i < l; i++) {
      let item = arr[i]
      // 原数组 arr也会跟着改变
      item.full = [item.domain, item.name].join(" ");
      newArr[i] = item
    }
    return newArr
  }

  console.log(getNewArr())



  /**
   打印
   0: {domain: "baidu.com", name: "百度", full: "baidu.com 百度"}
   1: {domain: "taobao.com", name: "淘宝", full: "taobao.com 淘宝"}
   2: {domain: "qq.com", name: "腾讯", full: "qq.com 腾讯"}
   */

  let arr2 = arr.map( (item,index) => {
    // 原数组 arr也会跟着改变
    item['full-name'] = [item.domain,item.name].join("-")
    return item //返回整个item
  })

  console.log(arr2)

  /**
   0: {domain: "baidu.com", name: "百度", full: "baidu.com 百度", full-name: "baidu.com-百度"}
   1: {domain: "taobao.com", name: "淘宝", full: "taobao.com 淘宝", full-name: "taobao.com-淘宝"}
   2: {domain: "qq.com", name: "腾讯", full: "qq.com 腾讯", full-name: "qq.com-腾讯"}
   */

  
  let arr3 = arr.map( (item,index) => {
    return item.domain // 只返回domain一项
  })
  console.log(arr3) // ["baidu.com", "taobao.com", "qq.com"]
```
常见的一道面试题<br />

```javascript
['1', '2', '3'].map(parseInt) what & why ?

进制理解

2进制，基数只能为 0，1
3进制，基数为0，1，2
4进制，基数为0，1，2，3
5进制，基数为0，1，2，3，4
...
8进制，基数为0，1，2，3，4，5，6，7
10进制，基数为0，1，2，3，4，5，6，7，8，9
16进制，基数为0，1，2，3，4，5，6，7，8，9，A,B,C,D,E,F

parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。
parseInt('1', 0) // 基数为0时，string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
parseInt('2', 1) // 基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
parseInt('3', 2) // 基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN

 ['1', '2', '3'].map((element, index, arr) => {
    console.log(element, index, arr)
})
arr.map(parseInt(element, index)) 
```
<a name="pmFIP"></a>
## filter
创建一个新的匹配过滤条件的数组。<br />
<br />`filter`  为数组中的每个元素调用一次 `callback`  函数，并利用所有使得 `callback`  返回 true 或等价于 true 的值的元素创建一个新数组。<br />
<br />`callback`  只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。<br />
<br />那些没有通过 `callback`  测试的元素会被跳过，不会被包含在新数组中。
<a name="SNSFI"></a>
### 语法
```javascript
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```
<a name="7ntNY"></a>
### 参数
callback用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。<br />它接受以下三个参数：

- element数组中当前正在处理的元素。
- index可选正在处理的元素在数组中的索引。
- array可选调用了 filter 的数组本身。
- thisArg可选执行 callback 时，用于 this 的值。
<a name="hg55y"></a>
### 返回值
一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。<br />

- `filter` 不会改变原数组，它返回过滤后的新数组。
- `filter` 遍历的元素范围在第一次调用 `callback` 之前就已经确定了。在调用 `filter` 之后被添加到数组中的元素不会被 `filter` 遍历到。如果已经存在的元素被改变了，则他们传入 `callback` 的值是 `filter` 遍历到它们那一刻的值。
- 被删除或从来未被赋值的元素不会被遍历到。



```javascript
  var newArrFilter3 = [0, 1, 2, 3].filter(function (item) {
    // 0 不会通过
    return item
  })
  console.log(newArrFilter3) // [1, 2, 3]



  var arrFilter = [
    {"name": "apple", "count": 2},
    {"name": "orange", "count": 5},
    {"name": "pear", "count": 3},
    {"name": "orange", "count": 16},
  ];

  let newArrFilter = []

  //不用 filter()
  for (var i = 0, l = arr.length; i < l; i++) {
    if (arrFilter[i].name === "orange") {
      newArrFilter.push(arr[i]);
    }
  }
  console.log(newArrFilter)
  // [{"name":"orange", "count": 5}, {"name":"orange", "count": 16}]

  //用了 filter() 把匹配的结果存放到 newArrFilter2 数里
  let newArrFilter2 = arrFilter.filter(function (item) {
    
    // 并利用所有使得 callback  返回 true 或等价于 true 的值的元素创建一个新数组
    return item.name === "orange" 
  });

  console.log(newArrFilter2)
  // [{"name":"orange", "count": 5}, {"name":"orange", "count": 16}]

  
  /**
   * Array filters items based on search criteria (query)
   * 在数组中搜索 下例使用 filter() 根据搜索条件来过滤数组内容。
   * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   */
  function filterItems(query) {
    return  ['apple', 'banana', 'grapes', 'mango', 'orange'].filter(function(el) {
      // true 就把el返回
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1
    })
  }

  console.log(filterItems('ap')); // ['apple', 'grapes']
  console.log(filterItems('an')); // ['banana', 'mango', 'orange']
```
<a name="HoDVE"></a>
# 
<a name="Nj2fw"></a>
## reduce
对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。<br />

<a name="HpnL9"></a>
### 语法
```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```
<a name="FaKBc"></a>
### 参数

- callback（一个在数组中每一项上调用的函数，接受四个函数：）
  - accumulator（上一次调用回调函数时的返回值，或者初始值）
  - currentValue（当前正在处理的数组元素）
  - index（当前正在处理的数组元素下标）
  - array（调用reduce()方法的数组）
- initialValue（可选的初始值。作为第一次调用回调函数时传给previousValue的值）



<a name="k8EsC"></a>
### 示例
<a name="CkoMm"></a>
#### 无初始值
```javascript
  let fr1 =['apple', 'banana', 'grapes', 'mango'].reduce((prev, next, i, arr) => {
    console.log(i, 'prev: ' + prev, 'next:' + next)
    // 1 "prev: apple" "next:banana"
    // 2 "prev: apple - banana" "next:grapes"
    // 3 "prev: apple - banana - grapes" "next:mango"
    
    return prev + " - " + next
    
  }) // 没有传初入初始值，直接把数组的第一项作为初始值 i为1

  console.log(fr1) // apple - banana - grapes - mango
```
<a name="GXo22"></a>
#### 有初始值
```javascript
  let reduceArr = ["apple", "orange", "apple", "orange", "pear", "orange"]
  let fr2 = reduceArr.reduce(((init, cur, i, arr) => {

    // i = 0 init= {},                    cur : "apple"
    // i = 1 init= {apple: 1},            cur : "orange"
    // i = 2 init= {apple: 1, orange: 1}, cur : "apple"
    // ...

    init[cur] = (init[cur] + 1) || 1
    return init
  }), {}) // 初始化值传入一个空对象 init = {}

  console.log(fr2) // {apple: 2, orange: 3, pear: 1}
```
<a name="qwcjZ"></a>
#### 按属性对object分类


```javascript
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
var groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// { 
//   20: [
//     { name: 'Max', age: 20 }, 
//     { name: 'Jane', age: 20 }
//   ], 
//   21: [{ name: 'Alice', age: 21 }] 
// }
```


<a name="um4ys"></a>
# 类数组转换为数组
作为前端，当我们在在操作获取DOM集合或arguments时，使用数组的方法通常会遇到如下情况：
```javascript
function test() {
     arguments.forEach(it => console.log(it))
   }

   test(1,2,3,4)

Uncaught TypeError: arguments.forEach is not a function
```
错误的原因<br />arguments是一个类数组对象，所以不能直接利用数组的方法（例如：forEach，map等），需要进行转换为数组后，才能用数组的方法！<br />
<br />转换的方法有很多，常见
```javascript
[].slice.call(arguments)
Array.from(arguments)
[...arguments]
```


<a name="W69NF"></a>
# 数组的引用传递
既然数组属于引用数据类型，那么也一定可以发生引用传递。
```javascript
   let fruit1 = ['apple', 'banana']
   let temp = fruit1
   temp.push('mango')

   // fruit1 ["apple", "banana", "mango"]
   // temp ["apple", "banana", "mango"]

```
<a name="l7gx6"></a>
# ![image.png](https://cdn.nlark.com/yuque/0/2020/png/357813/1587546518516-99256098-f4e9-45bf-a592-1babaff091b7.png#align=left&display=inline&height=200&margin=%5Bobject%20Object%5D&name=image.png&originHeight=400&originWidth=678&size=47238&status=done&style=none&width=339)
<a name="1Lx3x"></a>
# 数组的扩展

1. [扩展运算符](https://es6.ruanyifeng.com/#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)
1. [Array.from()](https://es6.ruanyifeng.com/#docs/array#Array.from())
1. [Array.of()](https://es6.ruanyifeng.com/#docs/array#Array.of())
1. [数组实例的 copyWithin()](https://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84%20copyWithin())
1. [数组实例的 find() 和 findIndex()](https://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84%20find()%20%E5%92%8C%20findIndex())
1. [数组实例的 fill()](https://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84%20fill())
1. [数组实例的 entries()，keys() 和 values()](https://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84%20entries()%EF%BC%8Ckeys()%20%E5%92%8C%20values())
1. [数组实例的 includes()](https://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84%20includes())
1. [数组实例的 flat()，flatMap()](https://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84%20flat()%EF%BC%8CflatMap())
1. [数组的空位](https://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E7%9A%84%E7%A9%BA%E4%BD%8D)
1. [Array.prototype.sort() 的排序稳定性](https://es6.ruanyifeng.com/#docs/array#Array.prototype.sort()%20%E7%9A%84%E6%8E%92%E5%BA%8F%E7%A8%B3%E5%AE%9A%E6%80%A7)



<a name="Lubyh"></a>
# 参考
[ECMAScript 6 入门](https://es6.ruanyifeng.com/) - [阮一峰](http://www.ruanyifeng.com/)<br />[MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)<br />

