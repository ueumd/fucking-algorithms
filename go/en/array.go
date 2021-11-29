package main

import (
	"fmt"
	"reflect"
)

func initArr() {
	// var 数组名称 [长度]数据类型 = [长度]数据类型{元素...}
	// 固定数组长度： 数组名称 := [长度]数据类型{...}
	// 暗示数组长度： 数组名称 := [...]数据类型{...}

	// 固定长度：数组不可增长、不可缩减，想要扩展，只能创建新数组
	var arr [3]int = [3]int{1, 2, 3}
	fmt.Println(arr) // 1 2 3

	// 简写
	arrTest := [3]int{1, 2, 3}
	fmt.Println(arrTest) // [1 2 3]

	// 定义的同时部分初始化 不够后面补nil
	var arr1 [4]string = [4]string{"A", "B"}
	fmt.Println(arr1) // [A B  ]

	// 补0
	var arr2 [4]int = [4]int{101, 301}
	fmt.Println(arr2) // [101 301 0 0]

	// 定义的同时指定元素初始化
	// 初始化前面数值是数组下标
	var arr3 [4]int = [4]int{1: 101, 3: 501}
	fmt.Println(arr3) // [0 101 0 501]

	// 1.先定义再逐个初始化
	var arr4 [5]int
	arr4[1] = 101
	arr4[2] = 300

	fmt.Println(arr4) // [0 101 300 0 0]

	// 暗示长度 定义的同时完全初始化
	var arr5 = [...]int{1, 2, 3}
	fmt.Println(arr5) // [1 2 3]

	// 定义时同时指定元素
	var arr6 = [...]int{6: 101}
	fmt.Println(arr6) // [0 0 0 0 0 0 101]

	arr7 := [...]int{1, 2, 3}
	arr7[1] = 666
	fmt.Println(arr7[0]) // 1
	fmt.Println(arr7[1]) // 666
	fmt.Println(arr7[2]) // 3

	// for 遍历
	for i := 0; i < len(arr7); i++ {
		fmt.Println(arr7[i])
	}

	// for ... rang
	for index, value := range arr7 {
		fmt.Println(index, value)
	}

	// 指针数组： [5]*int
	// 数组指针： *[5]int  参数传递

	// 指针数组 元素只能存放元素的地址

	arrP := [...]*int{new(int), new(int)}
	fmt.Println(arrP) //[0xc0000ae038 0xc0000ae040]

	x, y := 101, 201

	arrP2 := [...]*int{&x, &y}
	fmt.Println(arrP2) // [0xc0000160d0 0xc0000160d8]

	fmt.Println(*arrP2[0]) // 101
	fmt.Println(*arrP2[1]) // 102

	// 数组指针 指向一个数组的地址
	arr8 := [2]string{"Haha", "wow"}

	arrP3 := &arr8 //等介 var arrP3 *[2]string = &arr8

	fmt.Println(arrP3[0]) //Haha
	fmt.Println(arrP3[1]) //wow

}

func arrAddress()  {
	arr :=[...]int{1, 2, 3}
	fmt.Println(reflect.TypeOf(arr)) // [3]int

	// 数组的地址是就数组首元素地址
	fmt.Printf("%p, %p\n", &arr, &arr[0]) //0xc0000ae078, 0xc0000ae078


	// 切片
	slice :=[]int{1, 2, 3}
	fmt.Println(reflect.TypeOf(slice)) // []int

	// 切片不一样
	fmt.Printf("%p, %p\n", &slice, &slice[0]) //0xc000004078, 0xc0000101c8

}

func init() {
	arrAddress()
	// initArr()
}

// 值传递
func changeArr(arr [4]int) {
	for key, value := range arr {
		arr[key] = value + 1
	}

	fmt.Println(arr)
}

// 引用传递
func changeArr2(arr *[4]int) {
	for key, value := range arr {
		arr[key] = value + 1
	}

	fmt.Println(arr)
}

func main() {
	arr := [...]int{100, 200, 300, 400}
	fmt.Println("arr:", arr)
	// changeArr(arr)
	changeArr2(&arr)
	fmt.Println("arr:", arr)

	/**
	arr: [100 200 300 400]
	[101 201 301 401]
	arr: [100 200 300 400]

	arr: [100 200 300 400] 修改后
	&[101 201 301 401]
	arr: [101 201 301 401] // 修改后
	*/
}
