import { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";
import { useGetMyBookingsQuery } from "../redux/api/bookingSlice";

function MyBookings() {
  const id = JSON.parse(localStorage.getItem("userInfo")).id;
  const [bookings, setBookings] = useState([]);

  const {
    data: bookingData,
    isError,
    isLoading,
    refetch,
  } = useGetMyBookingsQuery(id, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (bookingData) {
      if (bookingData.data) setBookings(bookingData.data);
    }
  }, [bookingData]);

  // console.log(bookings);

  return (
    <>
      <div className="mx-4 min-h-screen">
        <h1 className="text-md md:text-lg py-4 font-bold">My Bookings: </h1>
        <div className="flex flex-col justify-center items-center gap-8">
          {bookings.length > 0 &&
            bookings.map((i, index) => (
              <BookingCard
                key={index}
                bookingId={i._id}
                passengers={i.passengers}
                source={i.flight.source}
                destination={i.flight.destination}
                flightNumber={i.flight.flightNumber}
                qty={i.passengers.length}
                price={i.flight.price}
                payment={i.paymentStatus}
                date={i.flight.travelDate}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default MyBookings;
