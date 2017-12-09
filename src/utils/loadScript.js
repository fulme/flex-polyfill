/**
 * 动态加载脚本
 * @param {string} src
 * @param {boolean} async
 */
export default function(src, async) {
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