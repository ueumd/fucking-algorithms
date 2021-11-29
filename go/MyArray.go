package main

import (
	"fmt"
	"sync"
)

type Array struct {
	cache []int
	len   int
	cap   int
	lock  sync.Mutex
}

func Make(len, cap int) *Array {
	array := new(Array)
	if len > cap {
		panic("len large than cap")
	}

	// 元数据
	list := make([]int, cap, cap)
	array.cache = list
	array.cap = cap
	array.len = len
	return array
}

func (self *Array) Len() int {
	return self.len
}

func (self *Array) Cap() int {
	return self.cap
}

func (array *Array) append(element int) {
	array.lock.Lock()
	defer array.lock.Unlock()

	if array.len == array.cap {

		// 容理不够，要扩容
		newCap := 2 * array.len

		// 如果之前的容量为0，那么新容量为1
		if array.cap == 0 {
			newCap = 1
		}

		newArray := make([]int, newCap, newCap)

		// 老数组元素拷贝到新数组元素里
		for key, val := range array.cache {
			newArray[key] = val
		}

		// 替换数组
		array.cache = newArray
		array.cap = newCap
	}

	// 添加元素
	array.cache[array.len] = element

	// 真实长度加1
	array.len += 1
}

func (array *Array) AppendMany(element ...int) {
	for _, v := range element {
		array.append(v)
	}
}

func (array *Array) Get(index int) int {
	if array.len == 0 || index > array.len {
		return -1
	}

	return array.cache[index]
}

func init() {
	//slice := make([]int, 1, 5)
	//fmt.Println(slice)
	//fmt.Println(len(slice))
	//fmt.Println(cap(slice))
}

func main() {
	arr := Make(0, 5)
	fmt.Println(arr)
	fmt.Println(arr.cache)
	fmt.Println(arr.Len())
	fmt.Println(arr.Cap())

	arr.append(55)
	fmt.Println(arr)
}
