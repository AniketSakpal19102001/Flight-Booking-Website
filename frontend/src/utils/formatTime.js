// utils/formatTime.js
const formatTime = (dateStr) => {
  const date = new Date(dateStr);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0 (midnight), set it to 12

  // Format the time as hh:mm am/pm
  return `${hours}:${minutes} ${ampm}`;
};
export default formatTime;
