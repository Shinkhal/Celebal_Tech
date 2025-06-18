// src/pages/Calendar.jsx
import React from 'react';
import MyCalendar from '../components/Calendar';

const Calendar = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-10 m-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Calendar</h1>
      <MyCalendar />
    </div>
  );
};

export default Calendar;
