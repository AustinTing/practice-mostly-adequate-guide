var _ = require('ramda')

// Curry example
var addFourNumbers = (a, b, c, d) => a + b + c + d
var curriedAddFourNumbers = _.curry(addFourNumbers)
var f = curriedAddFourNumbers(1, 2)
var g = f(3)
console.log(g.toString())
console.log(g(4)) // => 10

// 练习 1
// ==============
// 通过局部调用（partial apply）移除所有参数
var words = function (str) {
  return split(' ', str)
}
// -------------
// My Ans:
function split (pattern, str) {
  return str.split(pattern)
}
var partialAppliedWords = _.curry(words)
console.log(partialAppliedWords('aa bb')) // [ 'aa', 'bb' ]
// True Ans:
var words = split(' ')

// 练习 1a
// ==============
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组

var sentences = undefined
// --------------
// My Ans:
var newWords = _.map(words)
console.log(newWords(['aa bb cc', 'dd ee', 'f f'])) // [ [ 'aa', 'bb', 'cc' ], [ 'dd', 'ee' ], [ 'f', 'f' ] ]
// True Ans:
var sentences = map(words);

// 练习 2
// ==============
// 通过局部调用（partial apply）移除所有参数

var filterQs = function (xs) {
  return filter(function (x) { return match(/q/i, x);  }, xs)
}

// 练习 3
// ==============
// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数

// 无须改动:
var _keepHighest = function (x, y) { return x >= y ? x : y; }

// 重构这段代码:
var max = function (xs) {
  return reduce(function (acc, x) {
    return _keepHighest(acc, x)
  }, -Infinity, xs)
}

// 彩蛋 1:
// ============
// 包裹数组的 `slice` 函数使之成为 curry 函数
// //[1,2,3].slice(0, 2)
var slice = undefined

// 彩蛋 2:
// ============
// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
var take = undefined
