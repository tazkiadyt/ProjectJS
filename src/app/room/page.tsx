"use client";

import React, { useState } from "react";

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  availability: boolean;
}

const roomPrices: { [key: string]: number } = {
  "Standard": 500000,
  "Deluxe": 800000,
  "Suite": 1200000,
  "Presidential": 5000000,
};

const Page = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRoom, setNewRoom] = useState({ name: "", type: "Standard", price: roomPrices["Standard"], availability: true });
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const addRoom = () => {
    if (!newRoom.name || !newRoom.type) {
      alert("Semua field harus diisi!");
      return;
    }
    const updatedRooms = [...rooms, { id: rooms.length + 1, ...newRoom }];
    setRooms(updatedRooms);
    setNewRoom({ name: "", type: "Standard", price: roomPrices["Standard"], availability: true });
    alert("Kamar berhasil ditambahkan!");
  };

  const deleteRoom = (id: number) => {
    const updatedRooms = rooms.filter((room) => room.id !== id).map((room, index) => ({ ...room, id: index + 1 }));
    setRooms(updatedRooms);
    alert("Kamar berhasil dihapus!");
  };

  const editRoom = () => {
    if (editingRoom) {
      setRooms(rooms.map((room) => (room.id === editingRoom.id ? editingRoom : room)));
      setEditingRoom(null);
      alert("Kamar berhasil diperbarui!");
    }
  };

  const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const currentRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6 font-sans">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">Hotel Room Management</h1>
      
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari kamar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Add Room Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Tambah Kamar Baru</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Nama Kamar"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select
              value={newRoom.type}
              onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value, price: roomPrices[e.target.value] })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {Object.keys(roomPrices).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="text"
              value={`Rp ${newRoom.price.toLocaleString()}`}
              disabled
              className="p-3 border border-gray-300 rounded-lg bg-gray-100"
            />
            <button 
              onClick={addRoom} 
              className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-500 transition duration-300"
            >
              Tambah Kamar
            </button>
          </div>
        </div>

        {/* Room List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Daftar Kamar</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nama Kamar</th>
                <th className="p-3 text-left">Tipe</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Tersedia</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room) => (
                <tr key={room.id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="p-3">{room.id}</td>
                  <td className="p-3">{room.name}</td>
                  <td className="p-3">{room.type}</td>
                  <td className="p-3">Rp {room.price.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${room.availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {room.availability ? "Ya" : "Tidak"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => setEditingRoom(room)} 
                      className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteRoom(room.id)} 
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1} 
            className="p-3 bg-black text-white rounded-lg hover:bg-black transition duration-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages} 
            className="p-3 bg-black text-white rounded-lg hover:bg-black transition duration-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;