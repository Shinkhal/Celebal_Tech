import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 0,
      title: 'Board Meeting',
      start: new Date(2025, 5, 10, 9, 0),
      end: new Date(2025, 5, 10, 13, 0),
    },
    {
      id: 1,
      title: 'Team Lunch',
      start: new Date(2025, 5, 15, 12, 0),
      end: new Date(2025, 5, 15, 14, 0),
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = [];
  const current = new Date(startDate);
  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (newEventTitle.trim() && selectedDate) {
      const newEvent = {
        id: events.length,
        title: newEventTitle.trim(),
        start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 9, 0),
        end: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 10, 0),
      };
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setShowEventModal(false);
    }
  };

  const handleEventClick = (event) => {
    alert(`Event: ${event.title}\nTime: ${event.start.toLocaleString()}`);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 dark:bg-blue-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">📅</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {monthNames[month]} {year}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px border-t border-l border-gray-200 dark:border-gray-600 text-sm">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-r border-b dark:border-gray-600">
            {day}
          </div>
        ))}

        {calendarDays.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const isToday =
            date.getDate() === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear();
          const dayEvents = getEventsForDate(date);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                min-h-24 h-28 p-2 border-r border-b dark:border-gray-600 cursor-pointer transition-colors relative
                ${isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900 text-gray-400'}
                ${isToday ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
              `}
            >
              <div className={`text-xs font-semibold mb-1 ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                {date.getDate()}
              </div>
              <div className="space-y-1 overflow-hidden">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                    className="text-xs p-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded truncate hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                    title={`${event.title} - ${formatTime(event.start)}`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Add Event for {selectedDate?.toLocaleDateString()}
            </h3>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event title"
              className="w-full p-3 border dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleAddEvent()}
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={handleAddEvent}
                disabled={!newEventTitle.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setNewEventTitle('');
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
