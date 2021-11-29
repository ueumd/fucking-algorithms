/**
 一个图G=(V, E)由以下兀素组成：
 V: 一组顶点
 E: 一组边，连接V中的顶点

 深度优先搜索（Depth-First Search，DFS)：
    桟，通过将顶点存入桟中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问

 广度优先搜索（Breadth-First Search，BFS) ：
    队列，通过将顶点存入队列中，最先入队列的顶点先被探索
 */

/**
 * 邻接表
 */
import Dictionary from './Dictionary.js'

export default class Graph {
  constructor() {
    this.vertices = []
    this.adjList = new Dictionary()
    this.edges = 0
  }

  // 添加顶点
  addVertex(v) {
    this.vertices.push(v)
    this.adjList.set(v, [])
  }

  // 添加线
  addEdge(v, e) {
    this.adjList.get(v).push(e)
    this.adjList.get(e).push(v)
    this.edges ++
  }

  toString() {
    return this.vertices.reduce((r, v, i) => {
      return this.adjList.get(v).reduce((r, w, i) => {
        return r + `${w} `
      }, `${r}\n${v} => `)
    }, '')
  }

  /**
   * 广度优先搜索
   * @param v
   * @param callback
   * @returns {{distances: Array, predecessors: Array}}
   */
  bfs (v, callback) {
    const read = []                         // 存入读取过的节点
    const distances = []                    // 距离
    const predecessors = []                 // 前溯点
    const addJlist = this.adjList           // 邻接表
    let pending = [v || this.vertices[0]]   // 正在读取的节点

    const readVertices = vertices => {
      vertices.forEach(key => {
        // 队列 先进先出
        read.push(key)
        pending.shift()

        // 使用BFS寻找最短路径
        distances[key] = distances[key] || 0
        predecessors[key] = predecessors[key] || null

        addJlist.get(key).forEach(v => {
          if (!pending.includes(v) && !read.includes(v)) {
            pending.push(v)
            distances[v] = distances[key] + 1
            predecessors[v] = key
          }
        })

        if (callback) callback(key)
        if (pending.length) readVertices(pending)
      })
    }
    readVertices(pending)
    return { distances, predecessors }
  }

  /**
   * 顶点到其他顶点的路径
   * @param fromVertex
   */
  distance(fromVertex) {
    const vertices = this.vertices
    const { distances, predecessors } = this.bfs(fromVertex)
    vertices.forEach(toVertex => {
      if (!!distances[toVertex]) {
        let preVertex = predecessors[toVertex]
        let slug = ''
        while (fromVertex !== preVertex) {
          slug = `${preVertex} - ${slug}`
          preVertex = predecessors[preVertex]
        }
        slug = `${fromVertex} - ${slug}${toVertex}`
        console.log(slug)
      }
    })
  }

  dfs2 (callback) {
    const read = []
    const adjList = this.adjList
    const readVertices = vertices => {
      vertices.forEach(key => {
        if (read.includes(key)) return false
        read.push(key)
        if (callback) callback(key)
        if(read.length !== vertices.length) {
          readVertices(adjList.get(key))
        }
      })
    }
    readVertices(adjList.keys)
  }

  // depth first search
  dfs(callback) {
    let readTimer = 0
    const read = []
    const readTimes = []

    const finishedTimes = []
    const predecessors = []
    const adjList = this.adjList

    const readVertices = (vertices, predecessor) => { // 当前节点  前溯点
      vertices.forEach(key => {
        readTimer++
        if (adjList.get(key).every(v => read.includes(v)) && !finishedTimes[key]) {
          finishedTimes[key] = readTimer
        }
        if (read.includes(key)) return false
        readTimes[key] = readTimer
        read.push(key)
        if (callback) callback(key)
        predecessors[key] = predecessors[key] || predecessor || null
        if (read.length !== this.vertices.length) {
          readVertices(adjList.get(key), key)
        }
      })
    }
    readVertices(adjList.keys)
    return { readTimes, finishedTimes, predecessors }
  }
}