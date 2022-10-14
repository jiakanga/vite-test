// 1、给出一个区间的集合，请合并所有重叠的区间。
// 示例 1:
// 输入: [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例2:
// 输入: [[1,4],[4,5]]
// 输出: [[1,5]]
// 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。

var merge = function (intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }

  // 先将数组按照区间最左边的大小顺序排序
  let arr = intervals.sort((a, b) => a[0] - b[0]);
  function unite(arr, i) {
    if (i == arr.length - 1) {
      return arr;
    }

    // 如果下一个区间的左区间在本区间之间，则合并一次
    if (arr[i][0] <= arr[i + 1][0] && arr[i + 1][0] <= arr[i][1]) {
      arr[i] = [
        Math.min(arr[i][0], Math.max(arr[i + 1][0])),
        Math.max(arr[i][1], Math.max(arr[i + 1][1])),
      ];

      // 合并之后删除冗余区间
      arr.splice(i + 1, 1);
    } else {
      // 如果没有合并，则找到下一个待合并区间
      i++;
    }
    return unite(arr, i);
  }

  return unite(arr, 0);
};

merge([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
]);

// 2 、把数组按照指定拆分
function sliceArray(arr, size) {
  var arr2 = [];
  for (var i = 0; i < arr.length; i = i + size) {
    arr2.push(arr.slice(i, i + size));
  }
  return arr2;
}
