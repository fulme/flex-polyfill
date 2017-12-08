import onresizeListener from './utils/onresize';
import loadScript from './utils/loadScript';

const OPTIONS = {
  elem: null,
  src: '//j1.58cdn.com.cn/git/flex-polyfill/lib/flexibility.js'
};

function supportsFlexBox() {
  let test = document.createElement('test');
  test.style.display = 'flex';
  return test.style.display === 'flex';
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
    options.src = options.elem || OPTIONS.src;

    try {
      loadScript(src);
      window.flexibility(elem);
      onresizeListener(() => {
        window.flexibility(elem);
      });
    } catch(e){
      // TODO report
    }
  }
}