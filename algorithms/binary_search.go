package main

import "fmt"

/**
四要素：
1. 初始化 start = 0, end = len -1
2. 循环退出条件: start + 1 < end
3. 比较中点和目标值 A[mid] == target  / A[mid] < target / A[mid] > target
4. 判断最后两个元素是符合：A[start] / A[end] ? target
 */


/**
给定一个n个元素有序的（升序）整型数组nums 和一个目标值target ，写一个函数搜索nums中的 target，如果目标值存在返回下标，否则返回 -1。
链接：https://leetcode-cn.com/problems/binary-search

输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4

输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
 */


// 二分搜索最常用模板
func binarySearch(nums []int, target int) int  {

	// 1
	start, end := 0, len(nums)-1

	// 2
	for start + 1 < end {

		// 3
		mid := start + (end-start) /2

		if nums[mid] == target {
			end = mid
		} else if nums[mid] < target {
			start = mid
		} else if nums[mid] > target {
			end = mid
		}

		// 4
		if nums[start] == target {
			return start
		}
		if nums[end] == target {
			return end
		}
	}

	return -1
}

func main()  {
	nums := []int{-1,0,3,5,9,12}
	target:=9

	fmt.Println(binarySearch(nums, target)) // 4
}