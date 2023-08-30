import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBarang = () => {
  const [nama, setNama] = useState("");
  const [hargaBeli, setHargaBeli] = useState(0);
  const [hargaJual, setHargaJual] = useState(0);
  const [stok, setStok] = useState(0);
  const [foto, setFoto] = useState("");
  // const [fotoBaru, setFotoBaru] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getBarangById();
  }, []);

  const getBarangById = async () => {
    const response = await axios.get(`https://api-crud-image-production.up.railway.app/api/barang/${id}`);
    setNama(response.data.nama);
    setHargaBeli(response.data.hargaBeli);
    setHargaJual(response.data.hargaJual);
    setStok(response.data.stok);
    setFoto(response.data.foto);
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const updateBarang = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("hargaBeli", hargaBeli);
    formData.append("hargaJual", hargaJual);
    formData.append("stok", stok);
    formData.append("foto", foto);
    try {
      await axios.patch(`https://api-crud-image-production.up.railway.app/api/barang/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="max-w-lg mx-auto" onSubmit={updateBarang}>
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
          <input id="stok" type="number" value={stok} onChange={(e) => setStok(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Masukkan Stok" required />
        </div>
        <div className="mb-4">
          <label htmlFor="gambar" className="block mb-2 font-medium text-gray-700">
            Gambar
          </label>
          <img className="w-[100px]" src={foto && `https://api-crud-image-production.up.railway.app/public/uploads/${foto}`} alt="" />
          <input id="gambar" type="file" onChange={handleFileChange} accept=".jpg, .png" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          <p className="mt-2 text-sm text-gray-500">Ukuran maksimal: 100KB</p>
        </div>
        <div className="mt-6">
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBarang;
