let loaded = false;
const OPTIONS = {
  elem: null,
  src: 'http://j1.58cdn.com.cn/git/flex-polyfill/lib/flexibility.js'
};

/**
 * 检测浏览器是否支持flex布局
 * @returns {boolean}
 */
function supportsFlexBox() {
  try {
    let test = document.createElement('test');
    test.style.display = 'flex';
    return test.style.display === 'flex';
  } catch (e) {
    return false;
  }
}
/**
 * 动态加载脚本
 * @param {string} src
 * @param {boolean} async
 */
function loadScript(src, async) {
  let script = document.createElement('script');
  script.src = src;

  if (async) {
    script.setAttribute('async', 'async');
    script.setAttribute('defer', 'defer');
  } else {
    script.setAttribute('async', 'false');
  }

  document.body.appendChild(script);
}

/**
 * 初始化flex-polyfill
 * @param {Object} options
 */
export default function(options = OPTIONS) {
  if (supportsFlexBox()) {
    // Modern Flexbox is supported
  } else {
    options.elem = options.elem || document.documentElement;
    options.src = options.src || OPTIONS.src;

    try {
      if (!loaded && !window.flexibility) {
        loaded = true;
        loadScript(options.src);
      }

      window.flexibility.onresize({
        target: options.elem
      });
    } catch(e){
      // TODO report
    }
  }
}