"use client";

import React, { useState } from "react";

interface Booking {
  id: number;
  guestName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
}

const roomPrices: { [key: string]: number } = {
  Standard: 500000,
  Deluxe: 800000,
  Suite: 1200000,
  Presidential: 5000000,
};

const Page = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBooking, setNewBooking] = useState<Omit<Booking, "id">>({
    guestName: "",
    roomType: "Standard",
    checkInDate: "",
    checkOutDate: "",
    totalPrice: 0,
  });
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const calculateTotalPrice = (roomType: string, checkIn: string, checkOut: string) => {
    if (!roomType || !checkIn || !checkOut) return 0;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) return 0;

    const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
    const differenceInDays = Math.max(differenceInTime / (1000 * 3600 * 24), 1);

    return roomPrices[roomType] * differenceInDays;
  };

  const addBooking = () => {
    if (!newBooking.guestName || !newBooking.checkInDate || !newBooking.checkOutDate) {
      alert("Semua field harus diisi!");
      return;
    }

    if (new Date(newBooking.checkInDate) >= new Date(newBooking.checkOutDate)) {
      alert("Check-out harus setelah check-in!");
      return;
    }

    const totalPrice = calculateTotalPrice(newBooking.roomType, newBooking.checkInDate, newBooking.checkOutDate);
    const newId = bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 1;
    const updatedBookings = [...bookings, { id: newId, ...newBooking, totalPrice }];

    setBookings(updatedBookings);
    setNewBooking({
      guestName: "",
      roomType: "Standard",
      checkInDate: "",
      checkOutDate: "",
      totalPrice: 0,
    });
    alert("Booking berhasil ditambahkan!");
  };

  const deleteBooking = (id: number) => {
    const updatedBookings = bookings
      .filter((booking) => booking.id !== id)
      .map((booking, index) => ({ ...booking, id: index + 1 }));

    setBookings(updatedBookings);
    alert("Booking berhasil dihapus!");
  };

  const startEdit = (booking: Booking) => {
    setEditBooking({ ...booking });
  };

  const updateBooking = () => {
    if (!editBooking) return;

    if (new Date(editBooking.checkInDate) >= new Date(editBooking.checkOutDate)) {
      alert("Check-out harus setelah check-in!");
      return;
    }

    const totalPrice = calculateTotalPrice(editBooking.roomType, editBooking.checkInDate, editBooking.checkOutDate);
    const updatedBookings = bookings.map((b) =>
      b.id === editBooking.id ? { ...editBooking, totalPrice } : b
    );

    setBookings(updatedBookings);
    setEditBooking(null);
    alert("Booking berhasil diperbarui!");
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.guestName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 font-sans bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-8 text-blue-900">Booking Hotel</h1>

      {/* Formulir Tambah Booking */}
      <div className="mb-8 bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Tambah Booking</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Tamu"
            value={newBooking.guestName}
            onChange={(e) => setNewBooking({ ...newBooking, guestName: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newBooking.roomType}
            onChange={(e) => {
              setNewBooking({ ...newBooking, roomType: e.target.value });
            }}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(roomPrices).map((room) => (
              <option key={room} value={room}>
                {room} (Rp {roomPrices[room].toLocaleString()} / malam)
              </option>
            ))}
          </select>
          <div>
            <input
              type="date"
              value={newBooking.checkInDate}
              onChange={(e) => setNewBooking({ ...newBooking, checkInDate: e.target.value })}
              min={new Date().toISOString().split("T")[0]} // Hanya bisa memilih hari ini atau setelahnya
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Check-in harus setelah hari ini.
            </p>
          </div>
          <div>
            <input
              type="date"
              value={newBooking.checkOutDate}
              onChange={(e) => setNewBooking({ ...newBooking, checkOutDate: e.target.value })}
              min={newBooking.checkInDate || new Date().toISOString().split("T")[0]} // Hanya bisa memilih setelah check-in
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Check-out harus setelah tanggal check-in.
            </p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold text-blue-800">
              Total Harga: Rp{" "}
              {calculateTotalPrice(
                newBooking.roomType,
                newBooking.checkInDate,
                newBooking.checkOutDate
              ).toLocaleString()}
            </p>
          </div>
          <button
            onClick={addBooking}
            className="p-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 transition duration-300"
          >
            Tambah Booking
          </button>
        </div>
      </div>

      {/* Tabel Booking */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Daftar Booking</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-left text-blue-800">ID</th>
                <th className="p-3 text-left text-blue-800">Nama Tamu</th>
                <th className="p-3 text-left text-blue-800">Tipe Kamar</th>
                <th className="p-3 text-left text-blue-800">Check-In</th>
                <th className="p-3 text-left text-blue-800">Check-Out</th>
                <th className="p-3 text-left text-blue-800">Total Harga</th>
                <th className="p-3 text-left text-blue-800">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="p-3">{booking.id}</td>
                  <td className="p-3">{booking.guestName}</td>
                  <td className="p-3">{booking.roomType}</td>
                  <td className="p-3">{booking.checkInDate}</td>
                  <td className="p-3">{booking.checkOutDate}</td>
                  <td className="p-3">Rp {booking.totalPrice.toLocaleString()}</td>
                  <td className="p-3">
                    <button
                      onClick={() => startEdit(booking)}
                      className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit Booking */}
      {editBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold mb-6 text-blue-800">Edit Booking</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nama Tamu"
                value={editBooking.guestName}
                onChange={(e) => setEditBooking({ ...editBooking, guestName: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={editBooking.roomType}
                onChange={(e) => setEditBooking({ ...editBooking, roomType: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(roomPrices).map((room) => (
                  <option key={room} value={room}>
                    {room} (Rp {roomPrices[room].toLocaleString()} / malam)
                  </option>
                ))}
              </select>
              <div>
                <input
                  type="date"
                  value={editBooking.checkInDate}
                  onChange={(e) => setEditBooking({ ...editBooking, checkInDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Check-in harus setelah hari ini.
                </p>
              </div>
              <div>
                <input
                  type="date"
                  value={editBooking.checkOutDate}
                  onChange={(e) => setEditBooking({ ...editBooking, checkOutDate: e.target.value })}
                  min={editBooking.checkInDate || new Date().toISOString().split("T")[0]}
                  className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Check-out harus setelah tanggal check-in.
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold text-blue-800">
                  Total Harga: Rp{" "}
                  {calculateTotalPrice(
                    editBooking.roomType,
                    editBooking.checkInDate,
                    editBooking.checkOutDate
                  ).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditBooking(null)}
                  className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Batal
                </button>
                <button
                  onClick={updateBooking}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;