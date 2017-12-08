/**
 * 根据src检测脚本是否已经加载过
 * @param {string} src
 * @returns {boolean}
 */
function hasLoaded(src) {
  let scripts = document.getElementsByName('script');

  for (let i=0; i<scripts.length; i++) {
    if (src === scripts[i].src) {
      return true;
    }
  }
  return false;
}

/**
 * 动态加载脚本
 * @param {string} src
 * @param {boolean} async
 */
export default function(src, async = false) {
  if (!hasLoaded(src)) {
    let script = document.createElement('script');
    script.src = src;

    if (async) {
      script.setAttribute('async', 'async');
      script.setAttribute('defer', 'defer');
    }

    document.body.appendChild(script);
  }
}