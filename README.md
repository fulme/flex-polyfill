# flex-polyfill
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
```
```js
  // cmd
  let flexPolyfill = require('flex-polyfill');
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
```
```js
  // AMD
  requirejs(['./dist/index.min'], function(flexPolyfill) {
    flexPolyfill(options);
  });
```

# 注意事项
- `flex`仅支持`flex-grow`
- `align-items: stretch`的情况下，`flex-direction`从`row`切换到`column`可能会失败

尽量避免使用复杂的特性组合，此方案不能完备地支持标准的全部内容，[支持情况](https://github.com/jonathantneal/flexibility/blob/master/SUPPORT.md)。