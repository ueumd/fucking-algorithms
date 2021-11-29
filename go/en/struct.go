package main

import "fmt"

type person struct{
	name string
	age int
}

var p *person

func(self *person) change(name string)  {
	self.name = name
}

func (self person)changeName(name string)  {
	self.name = name
}

func main()  {

	p = &person{"Jack", 18}

	fmt.Println(p.name) // Jack

	p.change("张三")
	fmt.Println(p.name) // 张三

	p.changeName("Haha")
	fmt.Println(p.name) // 张三
}
