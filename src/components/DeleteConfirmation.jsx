
import { useState } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { deleteAsset } from "../services/api"

const DeleteConfirmation = ({ asset, onConfirm, onCancel }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteAsset(asset.id)
      toast.success("Asset deleted successfully!")
      onConfirm()
    } catch (err) {
      console.error(err)
      toast.error(err.message || "Failed to delete asset. Please try again.")
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 select-none">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center mb-4 text-yellow-500">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <h3 className="text-lg font-medium">Confirm Deletion</h3>
        </div>

        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-bold">
            {asset.name} ({asset.symbol})
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation

