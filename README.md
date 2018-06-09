# practice-mostly-adequate-guide
This is just a note.
- [MostlyAdequate/mostly-adequate-guide](https://github.com/MostlyAdequate/mostly-adequate-guide)
- [JS 函数式编程指南中文版](https://github.com/llh911001/mostly-adequate-guide-chinese)
## My Note
### CH2
- 函數可以不加括號直接返回本身
- 命名注意不要注目在特定的資料上
- 沒事函数不要不必要地包裹起来
### CH3
- 除了輸入值，沒有東西可以改變的返回值
- immutable變量在純函數很重要
- 只要是跟函数外部環境發生的交互就都是副作用
- 函数式编程的哲學就是假定副作用是造成不正當行為的主要原因
- 但不是禁止使用一切副作用，而是說，要讓它们在可控的範圍內發生
- 如果輸入直接指明了輸出，那麽就没有必要再實現具體的細節了，直接用物件實現
    - var isPrime = {1:false, 2: true, 3: true, 4: false, 5: true, 6:false};
- “純”的理由
    - 可緩存性（Cacheable）
    - 可移植性／自文档化（Portable / Self-Documenting）
        - var signUp = function(Db, Email, attrs) {
              return function() {
                var user = saveUser(Db, attrs);
                 welcomeUser(Email, user);
          };
        };
        - 純函数對於其依赖必须要誠實，這樣我们就能知道它的目的
    - 可测试性（Testable）
        - Quickcheck
    - 合理性（Reasonable）
        - 引用透明性（referential transparency）。如果一段代码可以替换成它执行所得的结果，而且是在不改变整个程序行为的前提下替换的，那么我们就说这段代码是引用透明的。
### CH4 curry
- 只傳遞给函数一部分参数來調用它，让它返回一个函数去處理剩下的参数。
-(看function: functionObject.toString())
```
// Curry example
var addFourNumbers = (a, b, c, d) => a + b + c + d
var curriedAddFourNumbers = _.curry(addFourNumbers)
var f = curriedAddFourNumbers(1, 2)
var g = f(3)
console.log(g.toString())
console.log(g(4)) // => 10
```
- 策略性地把要操作的数據（String， Array）放到最后一个参数里
### CH5 Compose
#### 函數飼養
```
var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };

// No compose
var shout = function(x){
  return exclaim(toUpperCase(x));
};

// Use compose
var shout = compose(exclaim, toUpperCase);
```
- Instead of inside to outside, we run right to left, which I suppose is a step in the *left direction*.
- 讓程式碼由左而右進行，更加反應數學上的含義，這種特性也就是結合律
 - 優點：靈活、可變
#### pointfree
- never having to say your data.
```
// not pointfree because we mention the data: word
const snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_');

// pointfree
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```
#### debug
- 用不純的`trace`函數追蹤程式碼情況
``` 
var trace = curry(function(tag, x){
  console.log(tag, x);
  return x;
});
var dasherize = compose(join('-'), toLower, trace("after split"), split(' '), replace(/\s{2,}/ig, ' '));
dasherize('The world is a vampire'); // after split [ 'The', 'world', 'is', 'a', 'vampire' ]
```
### CH6 Flicker
- 有原則的重構
  - map 的組合律
    ```
    var law = compose(map(f), map(g)) == map(compose(f, g))
    ```
  - Example:
    ```
    var srcs = _.compose(_.map(mediaUrl), _.prop('items'));
    var images = _.compose(_.map(img), srcs);
    // 利用內聯調用(inline the call)，將 map 排成一行
    var images = _.compose(_.map(img), _.map(mediaUrl), _.prop('items'))
    // 利用組合律：compose(map(f), map(g)) == map(compose(f, g)) 
    var images = _.compose(_.map(_.compose(img, mediaUrl)), _.prop('items'))
    // 抽離一部分讓程式好讀些
    var mediaToImg = _.compose(img, mediaUrl);
    var images = _.compose(_.map(mediaToImg), _.prop('items'))
    ```


