export function cssStyle(el) {
  if (!el) {
    return {};
  }
  var style = window.getComputedStyle(el, null);

  for (var _len = arguments.length, styleName = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    styleName[_key - 1] = arguments[_key];
  }

  return styleName.reduce(function (o, name) {
    o[name] = parseFloat(style.getPropertyValue(name));
    return o;
  }, {});
};

export function autoprefixer(css) {
  var prefixer = ['ms', 'webkit'];
  var style = ['transform'];
  style.forEach(function (item) {
    var cssValue = css[item];
    cssValue && prefixer.forEach(function (fix) {
      css[fix] = cssValue;
    });
  });
  return css;
};