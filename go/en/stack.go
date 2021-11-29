package main

import "fmt"

/**
push() 向栈中压入一个元素
pop() 从栈顶取出一个元素
isEmpty() 判断栈是否为空
length() 获取栈中元素的数目
peer() 查询栈顶元素
*/

type Stack struct {
	// 一个切片数组
	cache []int
}

func (self Stack) length() int {
	return len(self.cache)
}

func (sk *Stack) push(n int) int {
	sk.cache = append(sk.cache, n)
	return n
}

func (sk *Stack) pop() int {
	if sk.length() == 0 {
		return 0
	}

	elem := sk.cache[sk.length()-1]
	sk.cache = sk.cache[:sk.length()-1]
	return elem
}

func (sk *Stack) isEmpty() bool {
	return sk.length() == 0
}

func (sk *Stack) peer() int {
	return sk.cache[sk.length()-1]
}

func main() {
	var sk Stack

	sk.cache = []int{1, 2, 3, 4}
	sk.push(5)

	fmt.Println(sk.cache)

	fmt.Println(sk.isEmpty())

	fmt.Println(sk.peer())
	sk.pop()
	fmt.Println(sk.length())
}
