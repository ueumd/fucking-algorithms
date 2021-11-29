/**
 pop()	删除并返回数组的最后一个元素
 shift()	删除并返回数组的第一个元素

 push()	向数组的末尾添加一个或更多元素，并返回新的长度。
 unshift()  向数组的开头添加一个或更多元素，并返回新的长度。
 */

/**
 * 回调队列
 * @param {mixed}   context 上下文对象
 * @param {Function} done   函数结束回调
 * @param {Array}   queues  初始化队列
 */
export default function Queue (context, done , queues){
  const Q = (err) => {
    let args = arguments
    if (!err) {
      let it = Q._queues.shift()

      if (it) {
        if (args.length)
          args[0] = Q
        else
          args = [Q]
        return it.apply(Q._context, args)
      }
    }
    return Q._done && Q._done.apply(Q._context, args)
  }


  Q._context = context || null
  Q._done = done
  Q._queues = queues || []

  console.dir(Q)

  Q.unshift = (args) => {
    Q._queues.unshift.apply(Q._queues, args)
    return Q
  }

  Q.push = (func) => {
    Q._queues.push.apply(Q._queues, func)
    return Q
  }

  Q.next = (func) => {
    Q._queues.push(func)
    return Q
  }

  Q.start = () => {
    Q(null)
    return Q
  }

  Q.clone = (context, done , queues) => {
    return Queue(context || Q._context, done || Q._done, queues || Q._queues.slice())
  }

  Q.done = () => {
    Q._queues.length = 0
    return Q._done && Q._done.apply(Q._context, arguments)
  }

  return Q
}
