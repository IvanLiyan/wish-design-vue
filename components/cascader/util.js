export const DEFAULT_FIELD_NAMES = {
  label: 'label',
  value: 'value',
  children: 'children',
  isLeaf: 'isLeaf',
  disabled: 'disabled',
  loading: 'loading',
};

export const FILTERED_NODE_KEY = '__IS_FILTERED_NODE';

export function getActivePaths (array, value, fieldNames) {
  let target = array;
  const result = [];
  for (let i = 0; i < value.length && target; i++) {
    const n = target.find((item) => {
      return item[fieldNames.value] === value[i];
    });
    if (!n) {
      break;
    }
    result[i] = n;
    target = n[fieldNames.children];
  }
  return result;
};
