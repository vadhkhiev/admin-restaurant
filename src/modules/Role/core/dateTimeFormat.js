const dateTimeFormat = (inputString) => {
    const [datePart, timePart] = inputString?.split('T');
  
    const [year, month, day] = datePart?.split('-');
    const formattedDate = `${day}/${month}/${year?.slice(0,4)}`;
  
    const [hour, minute] = timePart?.slice(0, -1)?.split(':');
    const utcOffset = 7; // UTC+7
    const adjustedHour = parseInt(hour, 10) + utcOffset;
    
    // Ensure the hour is within the range 0-23
    const adjustedHourInRange = (adjustedHour + 24) % 24;
    
    // Format the time in 12-hour format with AM/PM
    const formattedTime = `${(adjustedHourInRange % 12) || 12}:${minute} ${adjustedHourInRange < 12 ? 'AM' : 'PM'}`;
  
    return `${formattedDate} at ${formattedTime}`;
  };

  export default dateTimeFormat