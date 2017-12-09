# flexibility
> flex布局的兼容方案，对[flexibility](https://github.com/jonathantneal/flexibility)的封装。

相对于直接接入`flexibility`，这里做了动态按需加载以及多种接入方式的支持。
后续使用过程中如果有什么问题，方便统一升级或回滚处理。

# CSS写法
```scss
  .container {
    // 在使用flex的选择器中增加这一声明就可以了
    // flexibility会据此进行降级方案构建
  	-js-display: flex;
  	
  	display: flex;
  }
```

# 使用
- 调用参数
```js
  let options = {
    // 使用flex布局的元素，可以不传（以下为默认值）
    elem: document.documentElement,
    // flexibility.js地址，可以不传（以下为默认值）
    src: '//j1.58cdn.com.cn/git/flex-polyfill/lib/flexibility.js'
  };
```

- NPM包引用方式
```shell
  // 安装
  npm i -S flex-polyfill
```
```js
  // es6
  import flexPolyfill from 'flex-polyfill';

  // or cmd
  // let flexPolyfill = require('flex-polyfill');
  flexPolyfill(options);
```

- 全局引用方式
```html
  <script src="./dist/index.min.js"></script>
```

```js
  window.flexPolyfill(options);
```

- 加载器引用方式
```js
  // CMD
  let flexPolyfill = require('./dist/index.min');
  flexPolyfill(options);    

  // or AMD
  requirejs(['./dist/index.min'], function(flexPolyfill) {
    flexPolyfill(options);
  });
```

# 支持程度及已知问题
尽量避免使用复杂的特性组合，此方案不能完备地支持标准的全部内容。
[详情](https://github.com/jonathantneal/flexibility/blob/master/SUPPORT.md)