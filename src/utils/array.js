function defaultEqual (v1, v2) {
  return v1 === v2;
}

// 以 a 为标准，找出 b 中所有不在 a 中的元素
export function subtraction (a, b, eql = defaultEqual) {
  const e1 = !a || !a.length;
  const e2 = !b || !b.length;
  if (e1 || e2) {
    // 空数据判断
    return e1 && e2 ? [] : (e1 ? b : []);
  }
  // 可以考虑 set， 但是无法传递 eql 方法，必须提供 value-key，后续需要确认 set 的风险
  return b.filter((item) => {
    const index = a.findIndex((it) => eql(item, it));
    return index === -1;
  });
}
