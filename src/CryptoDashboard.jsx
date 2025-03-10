
import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/NavBar"
import AssetTable from "./components/AssetTable"
import AssetForm from "./components/AssetForm"
import DeleteConfirmation from "./components/DeleteConfirmation"
import { fetchAssets, fetchAssetById } from "./services/api"

function CryptoDashboard() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentAsset, setCurrentAsset] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [assetToDelete, setAssetToDelete] = useState(null)

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = async () => {
    try {
      setLoading(true)
      const data = await fetchAssets()
      // Flatten the nested array structure from the API
      const flattenedData = data.map((item) => item[0])
      setAssets(flattenedData)
      setError(null)
    } catch (err) {
      setError("Failed to load assets. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

   const handleAddNew = () => {
    setCurrentAsset(null)
    setIsFormOpen(true)
  }

  const handleEdit = async (id) => {
    try {
      setLoading(true)
      const asset = await fetchAssetById(id)
      setCurrentAsset(asset)
      setIsFormOpen(true)
    } catch (err) {
      setError("Failed to load asset details. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (asset) => {
    setAssetToDelete(asset)
    setIsDeleteModalOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setCurrentAsset(null)
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    setCurrentAsset(null)
    loadAssets()
  }

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false)
    setAssetToDelete(null)
    loadAssets()
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setAssetToDelete(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white select-none">
      <Navbar onAddNew={handleAddNew} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Crypto Asset Management</h1>

        {error && <div className="bg-red-500 text-white p-4 rounded-md mb-6">{error}</div>}

        <AssetTable assets={assets} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      {isFormOpen && <AssetForm asset={currentAsset} onClose={handleFormClose} onSuccess={handleFormSuccess} />}

      {isDeleteModalOpen && assetToDelete && (
        <DeleteConfirmation asset={assetToDelete} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
      )}

      <Toaster position="top-right" />
    </div>
  )
}

export default CryptoDashboard

