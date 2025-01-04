"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Define a TypeScript interface for the user data
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
}

// Fetch user data
async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

// Home Component
export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      const usersData = await getUsers();
      setUsers(usersData);
    }
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">User List</h1>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md"
            onClick={() => setSelectedUser(user)}
          >
            <Image
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              alt={user.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <h2 className="text-lg font-semibold text-center">{user.name}</h2>
          </div>
        ))}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <button
              className="text-red-500 float-right text-lg"
              onClick={() => setSelectedUser(null)}
            >
              ✖
            </button>
            <Image
              src={`https://i.pravatar.cc/150?u=${selectedUser.id}`}
              alt={selectedUser.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-center mb-4">
              {selectedUser.name}
            </h2>
            <p className="mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p className="mb-2">
              <strong>Website:</strong>{" "}
              <Link
                href={`https://${selectedUser.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {selectedUser.website}
              </Link>
            </p>
            <p>
              <strong>City:</strong> {selectedUser.address.city}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
