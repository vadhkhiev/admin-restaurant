import React, { useState, useEffect } from 'react';

const DatePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState('');

  useEffect(() => {
    // Set the initial value to the current UTC date and time
    const currentDateTime = new Date().toISOString().slice(0, 19) + 'Z';
    setSelectedDateTime(currentDateTime);
  }, []); // Run this effect only once, when the component mounts

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dateTimePicker">Select a Date and Time (UTC):</label>
      <input
        type="datetime-local"
        id="dateTimePicker"
        name="dateTimePicker"
        value={selectedDateTime.slice(0, 16)}
        onChange={handleDateTimeChange}
      />
      <p>Selected Date and Time (UTC): {selectedDateTime}</p>
    </div>
  );
};

export default DatePicker;
