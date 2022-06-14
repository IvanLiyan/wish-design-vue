export var DEFAULT_FIELD_NAMES = {
  label: 'label',
  value: 'value',
  children: 'children',
  isLeaf: 'isLeaf',
  disabled: 'disabled',
  loading: 'loading'
};

export var FILTERED_NODE_KEY = '__IS_FILTERED_NODE';

export function getActivePaths(array, value, fieldNames) {
  var target = array;
  var result = [];

  var _loop = function _loop(i) {
    var n = target.find(function (item) {
      return item[fieldNames.value] === value[i];
    });
    if (!n) {
      return 'break';
    }
    result[i] = n;
    target = n[fieldNames.children];
  };

  for (var i = 0; i < value.length && target; i++) {
    var _ret = _loop(i);

    if (_ret === 'break') break;
  }
  return result;
};