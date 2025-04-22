import React, { useState, useEffect } from 'react';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [datesInMonth, setDatesInMonth] = useState([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get the first and last date of the month
  const getStartAndEndDates = (month, year) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return { startDate, endDate };
  };

  // Generate the dates for the month
  const generateCalendar = (month, year) => {
    const { startDate, endDate } = getStartAndEndDates(month, year);
    const dates = [];
    const firstDay = startDate.getDay();
    const lastDate = endDate.getDate();

    // Fill the first row with empty spaces for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      dates.push(null); // Empty spot before the first date
    }

    // Fill the calendar with actual dates
    for (let date = 1; date <= lastDate; date++) {
      dates.push(new Date(year, month, date));
    }

    // Add remaining empty spots to complete the last week
    const remainingDays = 7 - (dates.length % 7);
    if (remainingDays !== 7) {
      for (let i = 0; i < remainingDays; i++) {
        dates.push(null); // Empty spots after the last date
      }
    }

    setDatesInMonth(dates);
  };

  useEffect(() => {
    generateCalendar(currentMonth.getMonth(), currentMonth.getFullYear());
  }, [currentMonth]);

  const handleDateClick = (date) => {
    if (date) {
      onDateSelect(date);
    }
  };

  const changeMonth = (direction) => {
    const newMonth = currentMonth.getMonth() + direction;
    const newYear = currentMonth.getFullYear();
    if (newMonth < 0) {
      setCurrentMonth(new Date(newYear - 1, 11, 1)); // Go to December of previous year
    } else if (newMonth > 11) {
      setCurrentMonth(new Date(newYear + 1, 0, 1)); // Go to January of next year
    } else {
      setCurrentMonth(new Date(newYear, newMonth, 1));
    }
  };

  const formatDate = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 text-xl">{"<"}</button>
        <h2 className="text-xl font-semibold">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h2>
        <button onClick={() => changeMonth(1)} className="p-2 text-xl">{">"}</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold">{day}</div>
        ))}

        {datesInMonth.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            className={`p-2 rounded-lg ${
              date ? 
              (date.toDateString() === selectedDate?.toDateString() 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-blue-100')
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
