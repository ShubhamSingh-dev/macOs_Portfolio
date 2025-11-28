import { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysInMonth = currentDate.daysInMonth();
  const startDay = currentDate.startOf("month").day(); // 0 is Sunday

  const generateDays = () => {
    const days = [];
    // Empty slots for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-9 h-9" />);
    }
    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentDate.date(i);
      const isToday = date.isSame(dayjs(), "day");
      days.push(
        <div
          key={i}
          className={`w-9 h-9 flex items-center justify-center text-sm rounded-full cursor-pointer transition-all duration-200 ${
            isToday
              ? "bg-blue-500 text-white font-semibold shadow-lg scale-110"
              : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-105"
          }`}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className="calendar-widget">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            {currentDate.format("MMMM YYYY")}
          </h3>
          <div className="flex gap-1">
            <button 
              onClick={prevMonth} 
              className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full transition-colors" 
              aria-label="Previous month"
              type="button"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              onClick={nextMonth} 
              className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full transition-colors" 
              aria-label="Next month"
              type="button"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center mb-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-9">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {generateDays()}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <p className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium">
            {dayjs().format("dddd, MMMM D, YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
