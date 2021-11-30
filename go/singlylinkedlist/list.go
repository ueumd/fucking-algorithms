package singlylinkedlist

type Container interface {
	IsEmpty() bool
	Size() int
	Clear()
	Values() []interface{}
}

type List interface {
	Get(index int) (interface{}, bool)
	Remove(index int)
	Add(values ...interface{})
	Contains(values ...interface{}) bool
	Swap(index1, index2 int)
	Insert(index int, values ...interface{})
	Set(index int, value interface{})

	Container
	// Empty() bool
	// Size() int
	// Clear()
	// Values() []interface{}
}

