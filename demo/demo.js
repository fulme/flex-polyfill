var SELECTS = [];
var DEMO_ELEMENT;

function addListener(target, name, fn) {
  if (target.addEventListener) {
    target.addEventListener(name, fn);
  } else if (target.attachEvent) {
    target.attachEvent(('on'+name), fn);
  }
}

function onreadystatechange() {
  DEMO_ELEMENT = document.getElementById('demo');
  var selects = document.querySelectorAll('select');

  // 接入的时候需要调用
  flexPolyfill({
    elem: DEMO_ELEMENT,
    src: '../dist/lib/flexibility.js'
  });

  for (var i=0; i<selects.length; i++) {
    var select = selects[i];
    SELECTS.push(select);

    addListener(select, 'change', onchange);
  }
}

function onchange() {
  for (var i=0; i<SELECTS.length; i++) {
    var options = SELECTS[i];
    var key = options.name;
    var value = options.options[options.selectedIndex].value;

    DEMO_ELEMENT.style[key] = value;
  }

  if (window.flexibility) {
    // 布局变化的时候需要调用
    // 除了demo演示，一般不需要
    window.flexibility.onresize({
      target: DEMO_ELEMENT
    });
  }
}

addListener(document, 'readystatechange', onreadystatechange);