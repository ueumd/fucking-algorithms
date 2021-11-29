package main

import (
	"fmt"
	"unsafe"
)

type slice struct {
	array unsafe.Pointer // 指向数组的指针
	len   int            //	切片中元素数量
	cap   int            //	array 数组的总容量
}

// 深度拷贝: copy(sliceA, sliceB)
// 浅拷贝: sliceA = sliceB

// 1. 通过数组创建切片 array[startIndex:endIndex]
func createSliceByArray() {
	var arr = [5]int{1, 3, 5, 7, 9}

	// 从数组0下标开始取,一直取到2下标前面一个索引
	var sce1 = arr[0:2]
	fmt.Println(sce1) //[1 3]

	// 切片len = 结束位置 - 开始位置
	fmt.Println(len(sce1)) //2 2-0 = 2

	// 切片cap = 数组长度 - 开始位置
	fmt.Println(cap(sce1)) //5 5-0=5

	fmt.Printf("%p\n", &arr)
	fmt.Printf("%p\n", &arr[0])

	// 切片底层是指针数组，指向的是一块内存地址，前面无须加地址符号 &
	fmt.Printf("%p\n", sce1)
}

// 2. 通过make函数创建 make([]类型, 长度, 容量)
func createSliceByMake() {
	var sce = make([]int, 3, 5)
	fmt.Println(sce) //[0 0 0]
}

// 3. Go语法糖快速创建
// 3.1 不能指长度
// 3.2 长度和容量相等

func createSliceByQuickly() {
	// 这是数组 暗示长度
	var arr = [...]int{1, 3, 5}
	fmt.Println(arr)

	// 这是切片
	var sce = []int{1, 3, 5}
	fmt.Println(sce)                // [1 3 5]
	fmt.Println(len(sce), cap(sce)) // 3 3
}

/**
append函数会在切片末尾添加一个元素, 并返回一个追加数据之后的切片
利用append函数追加数据时,如果追加之后没有超出切片的容量,那么返回原来的切片, 如果追加之后超出了切片的容量,那么返回一个新的切片
append函数每次给切片扩容都会按照原有切片容量*2的方式扩容
如果希望切片自动扩容,那么添加数据时必须使用append方法
和数组一样, 如果通过切片名称[索引]方式操作切片, 不能越界
切片的基本使用方式和数组一样, 可以通过切片名称[索引]方式操作切片
*/
func appendEle() {
	sce := []int{0}
	sce[0] = 1
	fmt.Println(sce)

	// append函数会在切片末尾添加一个元素, 并返回一个追加数据之后的切片
	sce = append(sce, 200, 300, 400) // [1 200 300 400]
	fmt.Println(sce)
}

func init() {
	// createSliceByArray()
	// createSliceByMake()
	// createSliceByQuickly()
}

type ConfigBanWord struct {
	Id  int
	Txt string
}

// 这是一个切片 相当于一个指针数组，但不用初始化
var configBanWordSlice []*ConfigBanWord

// 这是一个指针数组 编译错误
// var configBanWordArray [...]*ConfigBanWord
// 只能这样定义，要初始化
var configBanWordArray = []*ConfigBanWord{&ConfigBanWord{Id: 1, Txt: "外挂"}, &ConfigBanWord{Id: 5, Txt: "赚钱"}}

func demo() {
	configBanWordSlice = append(configBanWordSlice,
		&ConfigBanWord{Id: 1, Txt: "外挂"},
		&ConfigBanWord{Id: 2, Txt: "辅助"},
		&ConfigBanWord{Id: 3, Txt: "微信"},
		&ConfigBanWord{Id: 4, Txt: "代练"},
		&ConfigBanWord{Id: 5, Txt: "赚钱"},
	)

	for index, data := range configBanWordSlice {
		fmt.Println(index, data.Txt)
		/**
		0 外挂
		1 辅助
		2 微信
		3 代练
		4 赚钱
		*/
	}

	for index, data := range configBanWordArray {
		/**
		0 外挂
		1 赚钱
		*/
		fmt.Println(index, data.Txt)
	}
}

/**
1. 切片声明后 需要开辟空间才可以使用 如make append。否则编译报错
2. 显示声明有长度的数组则可以直接使用，暗示长度数组长度报错
*/
func initTest() {
	var arr [3]int
	arr[1] = 199
	fmt.Println(arr) // [0 199 0]

	var arr2 = [...]string{"A", "B"}
	arr2[0] = "aaaaa"
	fmt.Println(arr2) // [aaaaa B]

	var slice []int
	// slice[0] = 1 编译报错，切片需要开辟空间
	slice = append(slice, 1)
	fmt.Println(slice)
}

// 删除操作
func remove() {
	// 初始化一个新的切片 seq
	seq := []string{"a", "b", "c", "d", "e", "f", "g"}

	fmt.Println("删除前：", seq)

	// 删除索引为3的元素 "d"
	index := 3
	seq = append(seq[:index], seq[index+1:]...)

	fmt.Println("删除后：", seq) // 删除后： [a b c e f g]

	// 删除索引 start 到 end 处的元素
	seq2 := []string{"a", "b", "c", "d", "e", "f", "g"}
	fmt.Println("删除前：", seq2) // 删除前： [a b c d e f g]

	// 删除b c d
	start, end := 1, 4

	seq2 = append(seq2[:start], seq2[end:]...)
	fmt.Println("删除后：", seq2) // 删除后： [a e f g]

}

func main() {
	//appendEle()
	//demo()

	initTest()

	remove()
}
