import { apiSlice } from "./apiSlice";
import { BOOKING_URL } from "../constant";

const bookingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyBookings: builder.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
      }),
    }),
    bookFlight: builder.mutation({
      query: ({ flightId, passengers }) => ({
        url: `${BOOKING_URL}/`,
        body: { flightId, passengers },
        method: "POST",
      }),
    }),
    updateBooking: builder.mutation({
      query: ({ id, passengers, paymentStatus }) => ({
        url: `${BOOKING_URL}/${id}`,
        body: { passengers, paymentStatus },
        method: "PUT",
      }),
    }),
    getBookingsById: builder.query({
      query: (id) => ({
        url: `${BOOKING_URL}/single/${id}`,
      }),
    }),
  }),
});

export const {
  useGetMyBookingsQuery,
  useBookFlightMutation,
  useUpdateBookingMutation,
  useGetBookingsByIdQuery,
} = bookingSlice;
