import React from "react";
import { NavLink } from "react-router-dom";

function FlightCard({
  id,
  flightNumber,
  source,
  destination,
  price,
  availableSeats,
  travelDate,
  arrivalTime,
  departureTime,
}) {
  return (
    <NavLink to={`/booking/${id}`}>
      <div className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg hover:shadow-xl bg-white  transform transition-transform duration-300 ease-in-out hover:translate-y-[-4px] cursor-pointer hover:bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            {flightNumber}
          </h3>
          <span className="text-lg font-medium text-gray-600">
            {price ? `$${price}` : "Price Not Available"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Source</p>
            <p className="text-lg font-semibold text-gray-700">{source}</p>
          </div>
          <div className="flex flex-col text-right">
            <p className="text-sm font-medium text-gray-600">Destination</p>
            <p className="text-lg font-semibold text-gray-700">{destination}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Travel Date</p>
            <p className="text-lg font-semibold text-gray-700">
              {new Date(travelDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col text-right">
            <p className="text-sm font-medium text-gray-600">Available Seats</p>
            <p className="text-lg font-semibold text-gray-700">
              {availableSeats}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-600">Departure Time</p>
            <p className="text-lg font-semibold text-gray-700">
              {departureTime}
            </p>
          </div>
          <div className="flex flex-col text-right">
            <p className="text-sm font-medium text-gray-600">Arrival Time</p>
            <p className="text-lg font-semibold text-gray-700">{arrivalTime}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default FlightCard;
