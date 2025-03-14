import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar";
import AssetTable from "./components/AssetTable";
import AssetForm from "./components/AssetForm";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { fetchAssets, fetchAssetById } from "./services/api";

function CryptoDashboard() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [u, su] = useState([]);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const data = await fetchAssets();
      console.log("Fetched assets:", data); // Логируем данные
      const flattenedData = data?.map((item) => item[0] || item) || [];
      setAssets(flattenedData);
      setError(null);
    } catch (err) {
      setError("Failed to load assets. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentAsset(null);
    setIsFormOpen(true);
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const asset = await fetchAssetById(id);
      setCurrentAsset(asset);
      setIsFormOpen(true);
    } catch (err) {
      setError("Failed to load asset details. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (asset) => {
    setAssetToDelete(asset);
    setIsDeleteModalOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentAsset(null);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setCurrentAsset(null);
    loadAssets();
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    setAssetToDelete(null);
    loadAssets();
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setAssetToDelete(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/crypto_assets/user"
        );
        const data = await response.json();
        su(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white select-none">
      <Navbar onAddNew={handleAddNew} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-8">Crypto Asset Management</h1>
          <button
            onClick={() => setIsUserFormOpen(!isUserFormOpen)}
            className="text-white py-2 px-4 rounded-full"
          >
            {isUserFormOpen ? "Close User Form" : "Add User"}
          </button>
        </div>

        {isUserFormOpen && (
          <form
            className="flex flex-col w-full max-w-96 mx-auto gap-5 mb-5 bg-gray-800 p-5 rounded-md"
            onSubmit={async (e) => {
              e.preventDefault();
              const username = e.target.elements.username.value;
              const github = e.target.elements.github.value;
              const password = e.target.elements.password.value;

              try {
                const res = await fetch(
                  "http://127.0.0.1:5000/crypto_assets/user",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email: github, password }),
                  }
                );

                const response = await res.json();
                if (response.error) {
                  setError(response.error);
                  return;
                }

                setError(null);
                console.log("User added successfully");
              } catch (err) {
                setError("Failed to add user. Please try again.");
                console.error(err);
              }
            }}
          >
            <input
              type="text"
              name="username"
              placeholder="Username:"
              className="py-2 px-4 border rounded-full"
              required
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub:"
              className="py-2 px-4 border rounded-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password:"
              className="py-2 px-4 border rounded-full"
              required
            />
            <button
              type="submit"
              className="py-2 px-4 border text-white rounded-full"
            >
              Add
            </button>
          </form>
        )}

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <AssetTable
          assets={assets}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          u={u}
        />

        {u.length > 0 && (
          <div className="bg-gray-800 p-5 rounded-md mt-5">
            <h2 className="text-xl font-bold mb-2">Users</h2>
            <ul>
              {u.map((user) => (
                <li key={user.id} className="mb-2 flex justify-between">
                  <span className="font-semibold">
                    {user.username} - {user.email}
                  </span>
                  <div className="flex gap-3">
                    <button className="text-amber-500" onClick={() => {}}>
                      Crypto
                    </button>
                    <button
                      className="text-red-400"
                      onClick={() => {
                        su(u.filter((u) => u.id !== user.id));
                        fetch(
                          `http://127.0.0.1:5000/crypto_assets/user/${user.id}`,
                          {
                            method: "DELETE",
                          }
                        );
                      }}
                    >
                      Удалить
                    </button>
                    <button className="text-blue-400" onClick={() => {}}>
                      Update
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {isFormOpen && (
        <AssetForm
          asset={currentAsset}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
          z={u}
        />
      )}

      {isDeleteModalOpen && assetToDelete && (
        <DeleteConfirmation
          asset={assetToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default CryptoDashboard;
