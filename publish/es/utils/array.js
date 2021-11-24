function defaultEqual(v1, v2) {
  return v1 === v2;
}

// 以 a 为标准，找出 b 中所有不在 a 中的元素
export function subtraction(a, b) {
  var eql = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultEqual;

  var e1 = !a || !a.length;
  var e2 = !b || !b.length;
  if (e1 || e2) {
    // 空数据判断
    return e1 && e2 ? [] : e1 ? b : [];
  }
  // 可以考虑 set， 但是无法传递 eql 方法，必须提供 value-key，后续需要确认 set 的风险
  return b.filter(function (item) {
    var index = a.findIndex(function (it) {
      return eql(item, it);
    });
    return index === -1;
  });
}