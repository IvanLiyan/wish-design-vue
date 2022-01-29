import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import { isArray, isString, isDate } from '@wish/wt-vue/es/utils/type';
import zh from 'dayjs/locale/zh-cn';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.locale(zh);

function converFormat(f) {
  return f.replace(/y/g, 'Y').replace(/d/g, 'D').replace(/W/g, 'w');
}

export var RANGE_SEPARATOR = '-';

export var DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  time: 'HH:mm:ss',
  timerange: 'HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
  week: 'yyyy-WW',
  weekrange: 'yyyy-WW'
};

var formatDate = function formatDate(date, format) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!date) return '';
  if (format === 'timestamp') {
    return date ? date.getTime() : undefined;
  }
  var weekStart = options.weekStart;

  var day = dayjs(date).locale(_Object$assign(zh, {
    weekStart: weekStart,
    name: 'zh-cn-' + weekStart
  }));
  if (day && format && /w/gi.test(format)) {
    // 包含周的格式化， 默认情况下在 2019-12-31 'YYYY ww' => 2019-01
    var month = day.month();
    var _weekOfYear = day.week();
    var year = day.year();
    if (_weekOfYear === 1 && month === 11) {
      day = day.weekday(6);
    }
    if (month === 0 && _weekOfYear >= 52) {
      day = day.weekday(0);
    }
    return day.format(converFormat(format));
  }
  return day ? day.format(converFormat(format || 'yyyy-MM-dd')) : '';
};
var parseDate = function parseDate(d, format) {
  if (format === 'timestamp') {
    return new Date(d);
  }
  return dayjs(d, converFormat(format || 'yyyy-MM-dd')).toDate();
};
var parseTime = function parseTime(d, format) {
  if (format === 'timestamp') {
    return new Date(d);
  } else if (isString(d)) {
    var now = new Date();
    var date = now.getDate();
    var n = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + date + ' ' + d;
    var f = 'yyyy-MM-dd ' + (format || 'HH:mm:ss');
    var day = dayjs(parseDate(n, f));
    if (day.isValid() && date !== day.date()) {
      // 保证格式化出来的日期是同一天
      day = day.add(-1, 'd');
    }
    return day.toDate();
  }
  return parseDate(d, format);
};

var DATE_FORMATTER = function DATE_FORMATTER(value, format, options) {
  return formatDate(isArray(value) ? value[0] : value, format, options);
};
var DATE_PARSER = function DATE_PARSER(text, format) {
  return text ? parseDate(text, format) : undefined;
};
var TIME_PARSER = function TIME_PARSER(text, format) {
  return text ? parseTime(text, format) : undefined;
};

var RANGE_FORMATTER = function RANGE_FORMATTER(value, format, options) {
  var SEPARATOR = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RANGE_SEPARATOR;

  if (isArray(value) && value.length === 2) {
    var start = value[0];
    var end = value[1];

    if (start && end) {
      return formatDate(start, format, options) + SEPARATOR + formatDate(end, format, options);
    }
  } else if (!Array.isArray(value) && isDate(value)) {
    return formatDate(value, format, options);
  }
  return '';
};
var RANGE_PARSER = function RANGE_PARSER(text, format) {
  var SEPARATOR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RANGE_SEPARATOR;

  if (!text) {
    return [];
  }
  var array = [];
  if (isArray(text)) {
    array = text;
  } else if (isString(text)) {
    array = text.split(SEPARATOR);
  }
  if (array.length === 2) {
    var range1 = array[0];
    var range2 = array[1];

    return [parseDate(range1, format), parseDate(range2, format)];
  }
  return [];
};
// Time Range 的文本转日期规则
var TIME_RANGE_PARSER = function TIME_RANGE_PARSER(text, format) {
  var SEPARATOR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RANGE_SEPARATOR;

  if (!text) {
    return [];
  }
  var array = [];
  if (isArray(text)) {
    array = text;
  } else if (isString(text) && text.length === 12) {
    array = [text.substr(0, 6), text.substr(6, 6)];
  } else if (isString(text)) {
    array = text.split(SEPARATOR); // 用"-"分割
  }
  if (array.length === 2) {
    // 时间范围的长度为2，当长度非法时判定整体格式错误
    return array.map(function (day) {
      return parseTime(day, format);
    });
  }
  return [];
};
export var TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      if (text === undefined || text === '') return undefined;
      return dayjs(text);
    }
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: TIME_RANGE_PARSER
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: TIME_PARSER
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  monthrange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  week: {
    // todo
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  weekrange: {
    // todo
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  multiple: {
    formatter: function formatter(value, format, options) {
      if (!value || !value.length) {
        return '';
      }
      return value.filter(Boolean).map(function (date) {
        return formatDate(date, format, options);
      }).join(',');
    },
    parser: function parser(value, format) {
      var values = isString(value) ? value.split(',') : value;
      if (!isArray(values)) {
        // todo: 提示类型必须是数组或字符串
        return [];
      }
      return values.map(function (value) {
        if (isDate(value)) return dayjs(value);
        if (typeof value === 'string') value = value.trim();else if (typeof value !== 'number' && !value) value = '';
        return parseDate(value, format);
      });
    }
  }
};

export var initTimeDate = function initTimeDate() {
  return dayjs().hour(0).minute(0).second(0).millisecond(0).toDate();
};

export var clearHours = function clearHours(time) {
  var cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

export function formatDateLabels(locale, format, date) {
  var componetsRegex = /(\[[^\]]+\])([^\[\]]+)(\[[^\]]+\])/; // eslint-disable-line
  var components = format.match(componetsRegex).slice(1);
  var separator = components[1];
  var day = dayjs(date);
  var labels = [components[0], components[2]].map(function (component) {
    var label = day.format(converFormat(component.slice(1, -1)));
    return {
      label: label,
      type: component.indexOf('yy') !== -1 ? 'year' : 'month'
    };
  });
  return {
    separator: separator,
    labels: labels
  };
}

export var getDayCountOfMonth = function getDayCountOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
};

export var getFirstDayOfMonth = function getFirstDayOfMonth(date) {
  var temp = date.date(1);
  return temp.day();
};

export function siblingMonth(date, diff) {
  var day = dayjs(date);
  return day.add(diff, 'month').toDate();
}

export function isInRange(date, from, to) {
  if (!from || !to) {
    return false;
  }
  var day = dayjs(date);
  var f = dayjs(from);
  var t = dayjs(to);
  return day.isSame(f) || day.isSame(t) || day.isBetween(f, t);
}

// export function max (...args) {
//   const a = args.filter((d) => d); // 过滤掉可能为空的选项
//   return dayjs.max(...a);
// }

export function toDate(date) {
  var _date = new Date(date);
  // IE patch start (#1422)
  if (isNaN(_date.getTime()) && typeof date === 'string') {
    _date = date.split('-').map(Number);
    _date[1] += 1;
    _date = new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(_date))))();
  }
  // IE patch end

  if (isNaN(_date.getTime())) return null;
  return _date;
}

export function getFirstDayOfWeek(date) {
  var weekStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var day = dayjs(date).locale(_Object$assign(zh, {
    weekStart: weekStart,
    name: 'zh-cn-' + weekStart
  }));
  return day.weekday(0).toDate();
}

export function getLastDayOfWeek(date, weekStart) {
  var first = getFirstDayOfWeek(date, weekStart);
  return dayjs(first).add(6, 'd').toDate();
}

export default dayjs;