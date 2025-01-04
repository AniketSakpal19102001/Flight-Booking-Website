import { apiSlice } from "./apiSlice";
import { FLIGHT_URL } from "../constant";

const flightSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFlights: builder.query({
      query: () => ({
        url: `${FLIGHT_URL}/all`,
      }),
    }),
    getFlightsByDetails: builder.query({
      query: ({ source, destination, travelDate }) => ({
        url: `${FLIGHT_URL}/?source=${source}&destination=${destination}&travelDate=${travelDate}`,
      }),
    }),
    getFlightsById: builder.query({
      query: (id) => ({
        url: `${FLIGHT_URL}/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAllFlightsQuery,
  useGetFlightsByDetailsQuery,
  useGetFlightsByIdQuery,
} = flightSlice;
