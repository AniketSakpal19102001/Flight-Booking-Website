// utils/generateFlightNumber.js
export const generateFlightNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // Generate a random airline code (e.g., "AI")
  const airlineCode =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));

  // Get current date in YYYYMMDD format
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  // Generate a random 4-digit number (e.g., "1234")
  const randomNumber = Array.from({ length: 4 }, () =>
    numbers.charAt(Math.floor(Math.random() * numbers.length))
  ).join("");

  // Return the flight number with the date and random number
  return `${airlineCode}${currentDate}-${randomNumber}`;
};
