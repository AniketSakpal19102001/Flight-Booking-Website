import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import formatDate from "../utils/formatDate";
import {
  useGetMyBookingsQuery,
  useUpdateBookingMutation,
} from "../redux/api/bookingSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  tableCell: {
    width: "33%",
    textAlign: "center",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 5,
  },
});

const BookingCard = ({
  source,
  destination,
  flightNumber,
  qty,
  price,
  payment,
  date,
  passengers,
  bookingId,
}) => {
  const [updateBooking] = useUpdateBookingMutation();
  const id = JSON.parse(localStorage.getItem("userInfo")).id;
  const { refetch } = useGetMyBookingsQuery(id, {
    refetchOnMountOrArgChange: true,
    staleTime: 0,
  });
  const navigate = useNavigate();
  // Create a PDF document for download
  const TicketPDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Ticket Number: {flightNumber}</Text>
          <Text>Source: {source}</Text>
          <Text>Destination: {destination}</Text>
          <Text>Date: {date}</Text>
          <Text>Quantity: {qty}</Text>
          <Text>Price: {qty * price}</Text>
        </View>

        {/* Table for Passenger Information */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Age</Text>
            <Text style={styles.tableCell}>Gender</Text>
          </View>
          {passengers.map((i) => (
            <View key={i._id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{i.name}</Text>
              <Text style={styles.tableCell}>{i.age}</Text>
              <Text style={styles.tableCell}>{i.gender}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  const handlePayment = async () => {
    try {
      const response = await updateBooking({
        id: bookingId,
        passengers: passengers,
        paymentStatus: "completed",
      }).unwrap();
      // console.log(response);
      refetch();
      toast.success(response.data.message, { autoClose: 500 });
      navigate("/my-bookings");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-booking/${bookingId}`);
  };
  return (
    <div className="mx-auto w-[95%] sm:w-[90%] border border-gray-500 rounded-lg flex flex-col gap-4 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:gap-4">
        <div>{`${source}-${destination}`}</div>
        <div className="text-sm text-gray-600"> {`(${flightNumber})`}</div>
      </div>
      <div className="flex items-center gap-6">
        <div>Qty: {qty}</div>
        <div>Price: {qty * price}</div>
        {payment === "pending" ? (
          <div>
            Payment:{" "}
            <span className="px-1 bg-red-100 text-red-500 rounded-md">
              Pending
            </span>
          </div>
        ) : (
          <div>Date: {formatDate(date)}</div>
        )}
      </div>
      <div className="flex justify-end items-center">
        {payment === "pending" ? (
          <div className="flex justify-center items-center gap-4">
            <button
              type="button"
              onClick={handleEdit}
              className="px-5 py-1 md:py-2 rounded-md border border-gray-400"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handlePayment}
              className="px-5 py-1 md:py-2 rounded-md bg-green-400 hover:opacity-85"
            >
              Pay
            </button>
          </div>
        ) : (
          <PDFDownloadLink
            document={<TicketPDF />}
            fileName={`${flightNumber}-ticket.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button className="px-5 py-1 md:py-2 rounded-md bg-yellow-400 hover:opacity-85">
                  Generating PDF...
                </button>
              ) : (
                <button className="px-5 py-1 md:py-2 rounded-md bg-yellow-400 hover:opacity-85">
                  View Ticket
                </button>
              )
            }
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
