"use client";
import React, { useState, useEffect } from 'react';

export default function Events() {
  // State to manage the selected date and events for that date
  const [selectedDate, setSelectedDate] = React.useState(new Date(2025, 5, 19));
  const [eventsForSelectedDate, setEventsForSelectedDate] = React.useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setAllEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Function to get events for a specific date
  useEffect(() => {
    const eventsOnDate = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
    setEventsForSelectedDate(eventsOnDate);
  }, [selectedDate, allEvents]);

  const handleSeeMoreClick = (event) => {
    setSelectedEventDetails(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEventDetails(null);
  };

  const handleRegisterClick = () => {
    alert('Registration functionality coming soon!');
    // Implement actual registration logic here
  };

  // Calendar logic (simplified for now)
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null); // Empty slots for days before the 1st
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const eventDates = allEvents.map(event => new Date(event.date).toDateString());

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="mb-6">Events</h1>
            <p className="text-xl text-gray-600">
              Join our exciting events and workshops
            </p>
          </div>
        </div>
      </section>

      {/* Events Calendar and List Section */}
      <section className="section bg-white py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto">
            {/* Calendar Column */}
            <div className="p-6 rounded-lg shadow-md bg-white border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigateMonth(-1)} className="text-gray-600 hover:text-[#387d8a]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-normal text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <button onClick={() => navigateMonth(1)} className="text-gray-600 hover:text-[#387d8a]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-sm font-light text-gray-500 mb-4">
                {daysOfWeek.map((day, index) => <div key={index}>{day}</div>)}
              </div>

              <div className="grid grid-cols-7 text-center text-base font-normal">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      relative cursor-pointer rounded-full
                      ${day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()
                        ? 'bg-[#EF4444] text-white'
                        : ''}
                      ${day ? 'hover:bg-gray-100' : 'text-gray-300'}
                      p-1 sm:p-2 md:p-3
                      min-w-[2rem] min-h-[2rem] sm:min-w-[2.5rem] sm:min-h-[2.5rem]
                      flex items-center justify-center mx-auto
                    `}
                    onClick={() => day && setSelectedDate(new Date(currentYear, currentMonth, day))}
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    {day}
                    {day && eventDates.includes(new Date(currentYear, currentMonth, day).toDateString()) && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#387d8a] rounded-full"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Events List Column */}
            <div className="p-6 rounded-lg shadow-md bg-white border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Events for {selectedDate.toDateString()}
              </h3>
              <div className="space-y-4">
                {eventsForSelectedDate.length > 0 ? (
                  eventsForSelectedDate.map(event => (
                    <div key={event.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <h4 className="text-xl font-bold text-[#387d8a] mb-1">{event.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">📅 {event.date} | ⏰ {event.time} | 📍 {event.location}</p>
                      <span className="inline-block mb-2 px-2 py-1 text-xs font-medium bg-[#387d8a]/10 text-[#387d8a] rounded-full">
                        {event.type}
                      </span>
                      <p className="text-base text-gray-600 mb-2 line-clamp-3">{event.shortDescription}</p>
                      <button
                        onClick={() => handleSeeMoreClick(event)}
                        className="text-[#387d8a] hover:text-[#2c5f6a] font-medium text-sm"
                      >
                        See More
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-gray-500">No events for this date.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {showModal && selectedEventDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedEventDetails.title}</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-base text-gray-600 mb-2">📅 {selectedEventDetails.date} | ⏰ {selectedEventDetails.time} | 📍 {selectedEventDetails.location}</p>
              <p className="text-base text-gray-700 mb-4 whitespace-pre-wrap">{selectedEventDetails.fullDescription || selectedEventDetails.shortDescription}</p>
              <span className="inline-block mb-4 px-3 py-1 text-sm font-medium bg-[#387d8a]/15 text-[#387d8a] rounded-full">
                {selectedEventDetails.type}
              </span>
              <div className="flex justify-end">
                <button
                  onClick={handleRegisterClick}
                  className="px-6 py-3 bg-[#387d8a] text-white rounded-lg font-semibold hover:bg-[#2c5f6a] transition-colors shadow-md"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 