package singlylinkedlist

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