'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return getMonthCalender.bind(config);
};

var _date = require('../utils/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMonthCalender(year, month, iteratorFn) {
  // config passed by binding
  var onlyDays = this.onlyDays;
  var weekStart = typeof this.weekStart === 'undefined' ? 1 : this.weekStart;
  var iso = weekStart === 1;
  var monthStart = (0, _date2.default)(new Date(year, month, 1)).locale({
    weekStart: weekStart,
    name: 'zh-cn-' + weekStart
  });
  var calenderStart = monthStart.weekday(0);

  var cells = [];
  var result = {
    year: year,
    month: month,
    cells: cells
  };
  for (var i = 0; i < 6; i++) {
    // 6 rows
    var _weekStart = calenderStart.add(7 * i, 'd');

    var _loop = function _loop(j) {
      // 8 columns: week nr + 7 days
      var isDay = j !== 0;
      var day = isDay ? _weekStart.add(j - 1, 'd') : _weekStart;
      var weekNr = iso ? day.isoWeek() : day.week();
      var currentMonth = day.month();
      var currentYear = day.year();
      var type = function () {
        if (j === 0) return 'weekLabel';else if (currentYear < year || currentMonth < month) return 'prevMonth';else if (currentYear > year || currentMonth > month) return 'nextMonth';else return 'monthDay';
      }();
      var dayData = {
        desc: isDay ? day.date() : weekNr,
        week: weekNr,
        type: type,
        date: isDay ? day.toDate() : false,
        year: currentYear,
        index: cells.length
      };
      var data = iteratorFn ? iteratorFn(dayData) : dayData;

      if (onlyDays && isDay) cells.push(data); // add only days
      else if (!onlyDays) cells.push(data);
    };

    for (var j = 0; j < 8; j++) {
      _loop(j);
    }
  }
  return result;
} // calendar with 8 column x 7 rows