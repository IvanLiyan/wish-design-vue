// calendar with 8 column x 7 rows
import dayjs from '../utils/date';

function getMonthCalender (year, month, iteratorFn) {
  // config passed by binding
  const onlyDays = this.onlyDays;
  const weekStart = typeof this.weekStart === 'undefined' ? 1 : this.weekStart;
  const iso = weekStart === 1;
  const monthStart = dayjs(new Date(year, month, 1)).locale({
    weekStart,
    name: `zh-cn-${weekStart}`,
  });
  const calenderStart = monthStart.weekday(0);

  const cells = [];
  const result = {
    year,
    month,
    cells: cells,
  };
  for (let i = 0; i < 6; i++) { // 6 rows
    const weekStart = calenderStart.add(7 * i, 'd');
    for (let j = 0; j < 8; j++) { // 8 columns: week nr + 7 days
      const isDay = j !== 0;
      const day = isDay ? weekStart.add(j - 1, 'd') : weekStart;
      const weekNr = iso ? day.isoWeek() : day.week();
      const currentMonth = day.month();
      const currentYear = day.year();
      const type = (function () {
        if (j === 0) return 'weekLabel';
        else if (currentYear < year || currentMonth < month) return 'prevMonth';
        else if (currentYear > year || currentMonth > month) return 'nextMonth';
        else return 'monthDay';
      })();
      const dayData = {
        desc: isDay ? day.date() : weekNr,
        week: weekNr,
        type: type,
        date: isDay ? day.toDate() : false,
        year: currentYear,
        index: cells.length,
      };
      const data = iteratorFn ? iteratorFn(dayData) : dayData;

      if (onlyDays && isDay) cells.push(data); // add only days
      else if (!onlyDays) cells.push(data);
    }
  }
  return result;
}

export default function (config) {
  return getMonthCalender.bind(config);
}
