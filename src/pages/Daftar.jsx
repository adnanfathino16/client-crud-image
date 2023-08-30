import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Daftar = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDaftar = (e) => {
    e.preventDefault();
    axios
      .post("https://api-crud-image-production.up.railway.app/api/daftar", {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center">Daftar</h1>
      <form className="max-w-lg mx-auto" onSubmit={handleDaftar}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Masukkan Username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Masukkan Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Password" className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            id="nama"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Masukkan Password"
            required
          />
        </div>
        <div className="mt-6">
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded">
            Daftar
          </button>
        </div>
        <p className="text-sm mt-5 text-center">
          sudah punya akun?{" "}
          <Link to="/login" className="font-bold text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Daftar;
