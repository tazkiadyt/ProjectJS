"use client";

import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const itemsPerPage = 2;

  const addUser = () => {
    if (!newUser.name || !newUser.email || !newUser.age) {
      alert("Semua field harus diisi!");
      return;
    }
    const updatedUsers = [...users, { id: users.length + 1, ...newUser, age: Number(newUser.age) }];
    setUsers(updatedUsers);
    setNewUser({ name: "", email: "", age: "" });
    alert("User berhasil ditambahkan!");
  };

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id).map((user, index) => ({ ...user, id: index + 1 }));
    setUsers(updatedUsers);
    alert("User berhasil dihapus!");
  };

  const editUser = () => {
    if (editingUser) {
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
      alert("User berhasil diperbarui!");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6 font-sans">
      <h1 className="text-center text-4xl font-bold mb-8 text-gray-800">Data Users</h1>
      
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Tambah User Baru</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nama"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Usia"
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button 
            onClick={addUser} 
            className="mt-4 w-full md:w-auto p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-500 transition duration-300"
          >
            Tambah User
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Daftar Users</h2>
          <div className="grid grid-cols-1 gap-4">
            {currentItems.map((user) => (
              <div key={user.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">Usia: {user.age}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingUser(user)} 
                      className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteUser(user.id)} 
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {editingUser && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Edit User</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="number"
                value={editingUser.age}
                onChange={(e) => setEditingUser({ ...editingUser, age: Number(e.target.value) })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button 
              onClick={editUser} 
              className="mt-4 w-full md:w-auto p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Simpan Perubahan
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-6">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1} 
            className="p-3 bg-black text-white rounded-lg hover:bg-black transition duration-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={nextPage} 
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