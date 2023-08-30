import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Home = () => {
  const [barang, setBarang] = useState([]);
  const navigate = useNavigate();

  useLogin();

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async () => {
    await axios
      .get("https://api-crud-image-production.up.railway.app/api/barang")
      .then((response) => {
        setBarang(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBarang = async (id) => {
    try {
      const konfirmasi = confirm("yakin ingin hapus ?");
      if (konfirmasi) {
        await axios.delete(`https://api-crud-image-production.up.railway.app/api/barang/${id}`);
      }
      getBarang();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between">
          <Link to="/tambah-barang" className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded">
            Tambah Barang
          </Link>
          <div>
            <button onClick={handleLogout} className="mr-2 px-4 py-2 text-white bg-slate-800 hover:bg-slate-500 rounded">
              Logout
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-300 mt-5">
          <thead>
            <tr className="text-center">
              <th className="px-6 py-3 border-b">Nama Barang</th>
              <th className="px-6 py-3 border-b">Harga Beli</th>
              <th className="px-6 py-3 border-b">Harga Jual</th>
              <th className="px-6 py-3 border-b">Stok</th>
              <th className="px-6 py-3 border-b">Aksi</th>
              <th className="px-6 py-3 border-b">Foto</th>
            </tr>
          </thead>
          <tbody>
            {barang.map((item, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm">{item.nama}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm">
                      {item.hargaBeli.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm">
                      {item.hargaJual.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <span className="text-sm">{item.stok}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b">
                    <button onClick={() => deleteBarang(item._id)} className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded">
                      Delete
                    </button>
                    <Link to={`/update-barang/${item._id}`} className="px-4 py-2 ml-2 text-white bg-blue-500 hover:bg-blue-600 rounded">
                      Update
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b flex items-center justify-center">
                    <img className="w-[100px] " src={`https://api-crud-image-production.up.railway.app/public/uploads/${item.foto}`} alt="" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;
