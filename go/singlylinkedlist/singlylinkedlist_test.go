package singlylinkedlist

import (
	"testing"
)

func TestListNew(t *testing.T)  {

	list2 := New(1, "b")

	if actualValue := list2.Size(); actualValue != 2 {
		t.Errorf("Got %v expected %v", actualValue, 2)
	}
}