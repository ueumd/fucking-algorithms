package main

import (
	"fmt"
	"sync"
)

/**
先进先出
*/

type ArrayQueue struct {
	array []string
	size  int
	lock  sync.Mutex
}

func (queue *ArrayQueue) Size() int {
	return queue.size
}

func (queue *ArrayQueue) IsEmpty() bool {
	return queue.size == 0
}

func (queue *ArrayQueue) Add(element string) {
	queue.lock.Lock()
	defer queue.lock.Unlock()

	queue.array = append(queue.array, element)
	queue.size += 1
}

func (queue *ArrayQueue) Remove() interface{} {
	queue.lock.Lock()
	defer queue.lock.Unlock()

	if queue.size == 0 {
		return -1
	}

	value := queue.array[0]

	// 缩容的那部分内存空间不会释放
	// queue.array = append(queue.array[1:]) 内

	newArray := make([]string, queue.size-1, queue.size-1)
	for i := 1; i < queue.size; i++ {
		// 从老数组的第一位开始进行数据移动
		newArray[i-1] = queue.array[i]
	}
	queue.array = newArray

	queue.size -= 1
	return value
}

func main() {
	queue := new(ArrayQueue)

	queue.Add("Vue")
	queue.Add("React")
	queue.Add("Angular")
	queue.Add("jQuery")

	fmt.Println(queue.array)
	fmt.Println(queue.size)

	queue.Remove()

	fmt.Println(queue.array)
	fmt.Println(queue.size)

}
