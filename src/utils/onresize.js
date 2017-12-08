const CALLBACKS = [];
const RESIZE_DELAY = 1000 / 60;
let onresizeTimeout;

function onResize(e) {
  if (!onresizeTimeout) {
    onresizeTimeout = setTimeout(() => {
      onresizeTimeout = null;
      for (let i=0; i<CALLBACKS.length; i++) {
        CALLBACKS[i](e);
      }
    }, RESIZE_DELAY);
  }
}

export default function(cb) {
  if (CALLBACKS.length === 0) {
    if (window.addEventListener) {
      window.addEventListener('resize', onResize);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', onResize);
    } else {
      window.onresize = onResize;
    }
  }

  if (typeof cb === 'function') {
    CALLBACKS.push(cb);
  }
}