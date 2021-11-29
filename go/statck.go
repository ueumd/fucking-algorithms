package main

import (
	"fmt"
	"sync"
)

/**
push() 向栈中压入一个元素
pop() 从栈顶取出一个元素
isEmpty() 判断栈是否为空
size() 获取栈中元素的数目
peer() 查询栈顶元素
*/

type ArrayStack struct {
	array []string
	size  int
	lock  sync.Mutex
}

func (stack *ArrayStack) IsEmpty() bool {
	return stack.size == 0
}

func (stack *ArrayStack) Size() int {
	return stack.size
}

func (stack *ArrayStack) Push(element string) int {
	stack.lock.Lock()
	defer stack.lock.Unlock()

	stack.array = append(stack.array, element)

	stack.size += 1

	return stack.size
}

func (stack *ArrayStack) peer() interface{} {
	if stack.size == 0 {
		return -1
	}
	return stack.array[stack.size-1]
}

func (stack *ArrayStack) pop() interface{} {
	stack.lock.Lock()
	defer stack.lock.Unlock()
	if stack.size == 0 {
		return -1
	}

	// 栈顶元素
	value := stack.array[stack.size-1]
	stack.size -= 1

	return value
}

func main() {
	stack := &ArrayStack{}
	stack.Push("go")
	stack.Push("gin")
	fmt.Println(stack.array)
	fmt.Println(stack.size)
	fmt.Println(stack.Size())
	fmt.Println(stack.peer())
}
