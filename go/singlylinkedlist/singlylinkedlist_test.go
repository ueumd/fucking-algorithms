package singlylinkedlist

import (
	"fmt"
	"testing"
)

func TestListNew(t *testing.T)  {

	list := New(1, "b")

	fmt.Println(list.head)

	if actualValue := list.Size(); actualValue != 2 {
		t.Errorf("Got %v expected %v", actualValue, 2)
	}
}


func TestListString(t *testing.T) {
	list := New()
	list.Add("a", "b", "c", 1234)

	str := list.String()

	fmt.Println("str:", str)

}

func TestListSet(t *testing.T) {
	list := New()
	list.Add("a", "b", "c", 1234)

	str := list.String()

	fmt.Println("str:", str)

	list.Set(1, "Gin")

	fmt.Println("str:", list.String())

}

