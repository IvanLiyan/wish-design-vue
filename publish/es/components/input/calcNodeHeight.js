var HIDDEN_TEXTAREA_STYLE = '\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

var SIZING_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'font-variant', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

var hiddenTextarea = void 0;

function getNodeFloatAttr(nodeStyle, attr) {
  return parseFloat(nodeStyle.getPropertyValue(attr) || 0);
}

function calcNodeStyling(node) {
  var style = window.getComputedStyle(node);
  var boxSizing = style.getPropertyValue('box-sizing');
  var paddingSize = getNodeFloatAttr(style, 'padding-bottom') + getNodeFloatAttr(style, 'padding-top');
  var borderSize = getNodeFloatAttr(style, 'border-bottom-width') + getNodeFloatAttr(style, 'border-top-width');

  var sizingStyle = SIZING_STYLE.map(function (name) {
    return name + ':' + style.getPropertyValue(name);
  }).join(';');

  return { boxSizing: boxSizing, paddingSize: paddingSize, borderSize: borderSize, sizingStyle: sizingStyle };
};

export default function calcNodeHeight(node) {
  var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  var _calcNodeStyling = calcNodeStyling(node),
      boxSizing = _calcNodeStyling.boxSizing,
      paddingSize = _calcNodeStyling.paddingSize,
      borderSize = _calcNodeStyling.borderSize,
      sizingStyle = _calcNodeStyling.sizingStyle;

  hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);
  hiddenTextarea.value = node.value || node.placeholder || '';

  var height = hiddenTextarea.scrollHeight;

  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = 'x';

  var result = {};
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    var minHeight = singleRowHeight * minRows;

    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }

    height = Math.max(minHeight, height);
    result.minHeight = minHeight + 'px';
  }
  if (maxRows !== null) {
    var maxHeight = singleRowHeight * maxRows;

    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }

    height = Math.min(maxHeight, height);
  }

  result.height = height + 'px';
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;

  return result;
};