import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FlightCard from "../components/FlightCard";
import { useGetAllFlightsQuery } from "../redux/api/flightSlice";
import { format } from "date-fns"; // Import date-fns for formatting dates
import formatDate from "../utils/formatDate";
import formatTime from "../utils/formatTime";
function SearchFlights() {
  const [flights, setFlights] = useState([]);
  const {
    data: flightData,
    isLoading,
    error,
    refetch,
  } = useGetAllFlightsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });
  console.log("error:", error);
  console.log("flight:", flightData);

  useEffect(() => {
    if (flightData) {
      setFlights(flightData.data);
    }
  }, [flightData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClear = () => {
    setFlights(flightData.data);
    refetch();
    reset();
  };

  const onSubmit = (data) => {
    console.log(data);
    setFlights(
      flights.filter(
        (i) =>
          i.source.toLowerCase() === data.source.toLowerCase() &&
          i.destination.toLowerCase() === data.destination.toLowerCase() &&
          i.date == data.date
      )
    );
  };
  console.log(flightData);

  if (isLoading) return <div className="py-5 text-center">Loading...</div>;
  return (
    <div className="py-10 w-full">
      <div className="mx-auto w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[45%] border border-gray-400 rounded-lg max-w-md p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-700"
            >
              Source
            </label>
            <input
              id="source"
              type="text"
              {...register("source", { required: "Source is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.source && (
              <span className="text-red-500 text-sm">
                {errors.source.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <input
              id="destination"
              type="text"
              {...register("destination", {
                required: "Destination is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.destination && (
              <span className="text-red-500 text-sm">
                {errors.destination.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              {...register("travelDate", { required: "Date is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.date && (
              <span className="text-red-500 text-sm">
                {errors.date.message}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-full  py-2 px-4 rounded-lg border border-black"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[45%] py-5">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard
              key={flight._id}
              id={flight._id}
              flightNumber={flight.flightNumber}
              source={flight.source}
              destination={flight.destination}
              price={flight.price}
              availableSeats={flight.availableSeats}
              // travelDate={format(new Date(flight.travelDate), "MM/dd/yyyy")}
              // arrivalTime={format(new Date(flight.arrivalTime), "hh:mm a")}
              // departureTime={format(new Date(flight.departureTime), "hh:mm a")}
              travelDate={formatDate(flight.travelDate)}
              arrivalTime={formatTime(flight.arrivalTime)}
              departureTime={formatTime(flight.departureTime)}
            />
          ))
        ) : (
          <div>No Flights Found</div>
        )}
      </div>
    </div>
  );
}

export default SearchFlights;
