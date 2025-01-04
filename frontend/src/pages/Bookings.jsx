import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useBookFlightMutation } from "../redux/api/bookingSlice";
import { toast } from "react-toastify";
import { useGetFlightsByIdQuery } from "../redux/api/flightSlice";
import formatDate from "../utils/formatDate";
import formatTime from "../utils/formatTime";
function Bookings() {
  const params = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [passengers, setPassengers] = useState([]);
  const [bookFlight] = useBookFlightMutation();
  const [flight, setFlight] = useState({});
  const navigate = useNavigate();
  const {
    data: flightData,
    isError,
    isLoading,
    refetch,
    error,
  } = useGetFlightsByIdQuery(params.flightId, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });
  const onSubmit = (data) => {
    setPassengers((prevPassengers) => [...prevPassengers, data]);
    reset();
  };

  useEffect(() => {
    if (flightData) {
      if (flightData.data) setFlight(flightData.data.flight);
    }
  }, [flightData]);

  console.log(flight);

  const handleBook = async () => {
    // const bookingData = {
    //   flightId: params.flightId,
    //   passengers: passengers,
    // };
    // console.log(bookingData);
    if (passengers.length === 0)
      return toast.error("Passengers details cannot be empty");

    try {
      const response = await bookFlight({
        flightId: params.flightId,
        passengers: passengers,
      }).unwrap();
      console.log(response);
      toast.success(response.data.message, { autoClose: 500 });
      navigate("/my-bookings");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <div className="mx-auto  w-[90%] md:w-[60%] rounded-lg ">
        <div className="border border-gray-300 rounded-lg p-6 my-5 shadow-lg hover:shadow-xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              {"Flight Number: "}
              {flight.flightNumber}
            </h3>
            <span className="text-lg font-medium text-gray-600">
              Price: ${flight.price}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-600">Source</p>
              <p className="text-lg font-semibold text-gray-700">
                {flight.source}
              </p>
            </div>
            <div className="flex flex-col text-right">
              <p className="text-sm font-medium text-gray-600">Destination</p>
              <p className="text-lg font-semibold text-gray-700">
                {flight.destination}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-600">Travel Date</p>
              <p className="text-lg font-semibold text-gray-700">
                {formatDate(flight.travelDate)}
              </p>
            </div>
            <div className="flex flex-col text-right">
              <p className="text-sm font-medium text-gray-600">
                Available Seats
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {flight.availableSeats}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-600">
                Departure Time
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {formatTime(flight.departureTime)}
              </p>
            </div>
            <div className="flex flex-col text-right">
              <p className="text-sm font-medium text-gray-600">Arrival Time</p>
              <p className="text-lg font-semibold text-gray-700">
                {formatTime(flight.arrivalTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-6 mx-auto w-[95%] md:w-[80%]">
        {passengers.length > 0 && (
          <div className="mt-6 mb-6 border p-6 shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800">
              Passenger List
            </h4>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">Name</th>
                    <th className="px-4 py-2 border border-gray-300">Age</th>
                    <th className="px-4 py-2 border border-gray-300">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {passengers.map((passenger, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {passenger.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {passenger.age}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {passenger.gender}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border p-6 shadow-lg bg-slate-100"
        >
          <div className="flex items-center">
            <label
              className="w-24 py-1 font-medium text-gray-600 "
              htmlFor="name"
            >
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              className="w-full py-1 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center">
            <label
              className="w-24 py-1 font-medium text-gray-600"
              htmlFor="age"
            >
              Age
            </label>
            <input
              {...register("age", { required: "Age is required" })}
              type="number"
              id="age"
              className="w-full py-1 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center">
            <label
              className="w-24 py-1 font-medium text-gray-600"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              id="gender"
              className="w-full py-1 border border-gray-300 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-end gap-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add Passenger
            </button>
            <button
              type="button"
              onClick={handleBook}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Book
            </button>
          </div>
        </form>

        {/* Passenger Table */}
      </div>
    </div>
  );
}

export default Bookings;
