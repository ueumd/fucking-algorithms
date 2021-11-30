package singlylinkedlist

import (
	"fmt"
	"strings"
)

type Node struct {
	value interface{}
	prev *Node
	next *Node
}

func NewNode(val interface{}) *Node  {
	return &Node{val, nil, nil}
}

type Singly struct {
	size int
	head *Node
	tail *Node
}

func NewSingly(values ...interface{}) *Singly {
	list := &Singly{}
	if len(values) > 0 {
		list.Add(values...)
	}
	return list
}

func New(values ...interface{}) *Singly {
	list := &Singly{}
	if len(values) > 0 {
		list.Add(values...)
	}
	return list
}

func (list *Singly)Add(values ...interface{})  {
	for _, value := range values {
		newNode := &Node{value: value}

		if list.size == 0 {
			list.head = newNode
			list.tail = newNode
		} else {
			list.tail.next = newNode
			list.tail = newNode
		}

		list.size ++
	}
}

func (list *Singly)Size() int  {
	return list.size
}

func (list *Singly)IsEmpty() bool  {
	return list.size == 0
}

func (list *Singly)Clear()  {
	list.size = 0
	list.head = nil
	list.tail = nil
}

func (list *Singly)String() string {
	str := "SinglyLinkedList\n"

	values := []string{}

	for head := list.head; head != nil; head = head.next {
		// fmt.Sprintf 同时转换为字符串
		values = append(values, fmt.Sprintf("%v", head.value))
	}

	str += strings.Join(values, ", ")

	return str
}

func (list *Singly)Append(values ...interface{})  {
	list.Add(values...)
}

// 根据index修改value
func (list *Singly)Set(index int, value interface{}) {

	if !list.withinRange(index) {
		// 直接添加
		if list.size == index {
			list.Add(value)
			return
		}
	}

	// 其他位置
	curNode := list.head

	for ps := 0; ps != index; {
		ps, curNode = ps +1, curNode.next
	}

	curNode.value = value
}

func (list *Singly)withinRange(index int) bool {
	return index >= 0 && index < list.size
}
