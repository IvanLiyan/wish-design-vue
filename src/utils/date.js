import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import { isArray, isString, isDate } from '@/utils/type';
import zh from 'dayjs/locale/zh-cn';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.locale(zh);

function converFormat (f) {
  return f.replace(/y/g, 'Y').replace(/d/g, 'D').replace(/W/g, 'w');
}

export const RANGE_SEPARATOR = '-';

export const DEFAULT_FORMATS = {
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
  weekrange: 'yyyy-WW',
};

const formatDate = function (date, format, options = {}) {
  if (!date) return '';
  if (format === 'timestamp') {
    return date ? date.getTime() : undefined;
  }
  const { weekStart } = options;
  let day = dayjs(date).locale(Object.assign(zh, {
    weekStart,
    name: `zh-cn-${weekStart}`,
  }));
  if (day && format && /w/gi.test(format)) {
    // 包含周的格式化， 默认情况下在 2019-12-31 'YYYY ww' => 2019-01
    const month = day.month();
    const weekOfYear = day.week();
    const year = day.year();
    if (weekOfYear === 1 && month === 11) {
      day = day.weekday(6);
    }
    if (month === 0 && weekOfYear >= 52) {
      day = day.weekday(0);
    }
    return day.format(converFormat(format));
  }
  return day ? day.format(converFormat(format || 'yyyy-MM-dd')) : '';
};
const parseDate = (d, format) => {
  if (format === 'timestamp') {
    return new Date(d);
  }
  return dayjs(d, converFormat(format || 'yyyy-MM-dd')).toDate();
};
const parseTime = (d, format) => {
  if (format === 'timestamp') {
    return new Date(d);
  } else if (isString(d)) {
    const now = new Date();
    const date = now.getDate();
    const n = `${now.getFullYear()}-${now.getMonth() + 1}-${date} ${d}`;
    const f = `yyyy-MM-dd ${format || 'HH:mm:ss'}`;
    let day = dayjs(parseDate(n, f));
    if (day.isValid() && date !== day.date()) {
      // 保证格式化出来的日期是同一天
      day = day.add(-1, 'd');
    }
    return day.toDate();
  }
  return parseDate(d, format);
};

const DATE_FORMATTER = function (value, format, options) {
  return formatDate(isArray(value) ? value[0] : value, format, options);
};
const DATE_PARSER = function (text, format) {
  return text ? parseDate(text, format) : undefined;
};
const TIME_PARSER = function (text, format) {
  return text ? parseTime(text, format) : undefined;
};

const RANGE_FORMATTER = function (
  value,
  format,
  options,
  SEPARATOR = RANGE_SEPARATOR,
) {
  if (isArray(value) && value.length === 2) {
    const start = value[0];
    const end = value[1];

    if (start && end) {
      return (
        formatDate(start, format, options) + SEPARATOR + formatDate(end, format, options)
      );
    }
  } else if (!Array.isArray(value) && isDate(value)) {
    return formatDate(value, format, options);
  }
  return '';
};
const RANGE_PARSER = function (
  text,
  format,
  SEPARATOR = RANGE_SEPARATOR,
) {
  if (!text) {
    return [];
  }
  let array = [];
  if (isArray(text)) {
    array = text;
  } else if (isString(text)) {
    array = text.split(SEPARATOR);
  }
  if (array.length === 2) {
    const range1 = array[0];
    const range2 = array[1];

    return [parseDate(range1, format), parseDate(range2, format)];
  }
  return [];
};
// Time Range 的文本转日期规则
const TIME_RANGE_PARSER = function (
  text,
  format,
  SEPARATOR = RANGE_SEPARATOR,
) {
  if (!text) {
    return [];
  }
  let array = [];
  if (isArray(text)) {
    array = text;
  } else if (isString(text) && text.length === 12) {
    array = [text.substr(0, 6), text.substr(6, 6)]
  } else if (isString(text)) {
    array = text.split(SEPARATOR); // 用"-"分割
  }
  if (array.length === 2) {
    // 时间范围的长度为2，当长度非法时判定整体格式错误
    return array.map((day) => parseTime(day, format));
  }
  return [];
};
export const TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter (value) {
      if (!value) return '';
      return '' + value;
    },
    parser (text) {
      if (text === undefined || text === '') return undefined;
      return dayjs(text);
    },
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: TIME_RANGE_PARSER,
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: TIME_PARSER,
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER,
  },
  monthrange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER,
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER,
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  week: {
    // todo
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  weekrange: {
    // todo
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER,
  },
  multiple: {
    formatter (value, format, options) {
      if (!value || !value.length) {
        return '';
      }
      return value
        .filter(Boolean)
        .map((date) => formatDate(date, format, options))
        .join(',');
    },
    parser (value, format) {
      const values = isString(value) ? value.split(',') : value;
      if (!isArray(values)) {
        // todo: 提示类型必须是数组或字符串
        return [];
      }
      return values.map((value) => {
        if (isDate(value)) return dayjs(value);
        if (typeof value === 'string') value = value.trim();
        else if (typeof value !== 'number' && !value) value = '';
        return parseDate(value, format);
      });
    },
  },
};

export const initTimeDate = function () {
  return dayjs().hour(0).minute(0).second(0).millisecond(0).toDate();
};

export const clearHours = function (time) {
  const cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

export function formatDateLabels (locale, format, date) {
  const componetsRegex = /(\[[^\]]+\])([^\[\]]+)(\[[^\]]+\])/; // eslint-disable-line
  const components = format.match(componetsRegex).slice(1);
  const separator = components[1];
  const day = dayjs(date);
  const labels = [components[0], components[2]].map((component) => {
    const label = day.format(converFormat(component.slice(1, -1)));
    return {
      label: label,
      type: component.indexOf('yy') !== -1 ? 'year' : 'month',
    };
  });
  return {
    separator: separator,
    labels: labels,
  };
}

export const getDayCountOfMonth = function (year, month) {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = function (date) {
  const temp = date.date(1);
  return temp.day();
};

export function siblingMonth (date, diff) {
  const day = dayjs(date);
  return day.add(diff, 'month').toDate();
}

export function isInRange (date, from, to) {
  if (!from || !to) {
    return false;
  }
  const day = dayjs(date);
  const f = dayjs(from);
  const t = dayjs(to);
  return day.isSame(f) || day.isSame(t) || day.isBetween(f, t);
}

// export function max (...args) {
//   const a = args.filter((d) => d); // 过滤掉可能为空的选项
//   return dayjs.max(...a);
// }

export function toDate (date) {
  let _date = new Date(date);
  // IE patch start (#1422)
  if (isNaN(_date.getTime()) && typeof date === 'string') {
    _date = date.split('-').map(Number);
    _date[1] += 1;
    _date = new Date(..._date);
  }
  // IE patch end

  if (isNaN(_date.getTime())) return null;
  return _date;
}

export function getFirstDayOfWeek (date, weekStart = 1) {
  const day = dayjs(date).locale(Object.assign(zh, {
    weekStart,
    name: `zh-cn-${weekStart}`,
  }));
  return day.weekday(0).toDate();
}

export function getLastDayOfWeek (date, weekStart) {
  const first = getFirstDayOfWeek(date, weekStart);
  return dayjs(first).add(6, 'd').toDate();
}

export default dayjs;
