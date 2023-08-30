import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post("https://api-crud-image-production.up.railway.app/api/login", {
        username,
        password,
      })
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center">Login</h1>
      <form className="max-w-lg mx-auto" onSubmit={handleLogin}>
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
            Login
          </button>
        </div>
        <p className="text-sm mt-5 text-center">
          belum punya akun?{" "}
          <Link to="/daftar" className="font-bold text-blue-600">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
