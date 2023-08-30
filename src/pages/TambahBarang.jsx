import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahBarang = () => {
  const [nama, setNama] = useState("");
  const [hargaBeli, setHargaBeli] = useState(0);
  const [hargaJual, setHargaJual] = useState(0);
  const [stok, setStok] = useState(0);
  const [foto, setFoto] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("hargaBeli", hargaBeli);
    formData.append("hargaJual", hargaJual);
    formData.append("stok", stok);
    formData.append("foto", foto);
    await axios
      .post("https://api-crud-image-production.up.railway.app/api/barang", formData)
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block mb-2 font-medium text-gray-700">
              Nama Barang
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Masukkan Nama Barang"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hargaBeli" className="block mb-2 font-medium text-gray-700">
              Harga Beli
            </label>
            <input
              id="hargaBeli"
              type="number"
              value={hargaBeli}
              onChange={(e) => setHargaBeli(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Masukkan Harga Beli"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hargaJual" className="block mb-2 font-medium text-gray-700">
              Harga Jual
            </label>
            <input
              id="hargaJual"
              type="number"
              value={hargaJual}
              onChange={(e) => setHargaJual(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Masukkan Harga Jual"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stok" className="block mb-2 font-medium text-gray-700">
              Stok
            </label>
            <input
              id="stok"
              type="number"
              value={stok}
              onChange={(e) => setStok(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Masukkan Stok"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foto" className="block mb-2 font-medium text-gray-700">
              Foto
            </label>
            <input id="foto" type="file" onChange={handleFileChange} accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
            <p className="mt-2 text-sm text-gray-500">Ukuran maksimal: 100KB</p>
          </div>
          <div className="mt-6">
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TambahBarang;
