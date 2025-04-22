import React, { useState, useEffect } from 'react';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [datesInMonth, setDatesInMonth] = useState([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStartAndEndDates = (month, year) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return { startDate, endDate };
  };

  const generateCalendar = (month, year) => {
    const { startDate, endDate } = getStartAndEndDates(month, year);
    const dates = [];
    const firstDay = startDate.getDay();
    const lastDate = endDate.getDate();

    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let date = 1; date <= lastDate; date++) dates.push(new Date(year, month, date));
    const remainingDays = 7 - (dates.length % 7);
    if (remainingDays !== 7) for (let i = 0; i < remainingDays; i++) dates.push(null);

    setDatesInMonth(dates);
  };

  useEffect(() => {
    generateCalendar(currentMonth.getMonth(), currentMonth.getFullYear());
  }, [currentMonth]);

  const handleDateClick = (date) => {
    if (date) onDateSelect(date);
  };

  const changeMonth = (direction) => {
    const newMonth = currentMonth.getMonth() + direction;
    const newYear = currentMonth.getFullYear();
    if (newMonth < 0) setCurrentMonth(new Date(newYear - 1, 11, 1));
    else if (newMonth > 11) setCurrentMonth(new Date(newYear + 1, 0, 1));
    else setCurrentMonth(new Date(newYear, newMonth, 1));
  };

  return (
    <div className="w-full h-full p-4 bg-white/20 dark:bg-slate-900/20 rounded-2xl shadow-lg backdrop-blur-md border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="px-2 py-1 text-xl font-bold">{'<'}</button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)} className="px-2 py-1 text-xl font-bold">{'>'}</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-900 dark:text-white">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold">{day}</div>
        ))}
        {datesInMonth.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            className={`aspect-square rounded-md transition-all ${
              date
                ? date.toDateString() === selectedDate?.toDateString()
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'hover:bg-cyan-200 dark:hover:bg-cyan-600'
                : 'bg-transparent cursor-default'
            }`}
            disabled={!date}
          >
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
