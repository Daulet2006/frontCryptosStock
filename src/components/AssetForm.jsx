
import { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { addAsset, updateAsset } from "../services/api"

const AssetForm = ({ asset, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    price: "",
    market_cap: "",
    volume_24h: "",
    percent_change_1h: "",
    percent_change_24h: "",
    percent_change_7d: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || "",
        symbol: asset.symbol || "",
        price: asset.price || "",
        market_cap: asset.market_cap || "",
        volume_24h: asset.volume_24h || "",
        percent_change_1h: asset.percent_change_1h || "",
        percent_change_24h: asset.percent_change_24h || "",
        percent_change_7d: asset.percent_change_7d || "",
      })
    }
  }, [asset])

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.symbol.trim()) newErrors.symbol = "Symbol is required"
    if (!formData.price || isNaN(formData.price)) newErrors.price = "Valid price is required"
    if (!formData.market_cap || isNaN(formData.market_cap)) newErrors.market_cap = "Valid market cap is required"
    if (!formData.volume_24h || isNaN(formData.volume_24h)) newErrors.volume_24h = "Valid volume is required"
    if (!formData.percent_change_1h || isNaN(formData.percent_change_1h))
      newErrors.percent_change_1h = "Valid percentage is required"
    if (!formData.percent_change_24h || isNaN(formData.percent_change_24h))
      newErrors.percent_change_24h = "Valid percentage is required"
    if (!formData.percent_change_7d || isNaN(formData.percent_change_7d))
      newErrors.percent_change_7d = "Valid percentage is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    try {
      setLoading(true)

      // Convert string values to numbers for the API
      const numericFormData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        market_cap: Number.parseFloat(formData.market_cap),
        volume_24h: Number.parseFloat(formData.volume_24h),
        percent_change_1h: Number.parseFloat(formData.percent_change_1h),
        percent_change_24h: Number.parseFloat(formData.percent_change_24h),
        percent_change_7d: Number.parseFloat(formData.percent_change_7d),
      }

      if (asset) {
        await updateAsset(asset.id, numericFormData)
        toast.success("Asset updated successfully!")
      } else {
        await addAsset(numericFormData)
        toast.success("Asset added successfully!")
      }

      onSuccess()
    } catch (err) {
      console.error(err)
      toast.error(err.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 select-none">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">{asset ? "Edit Asset" : "Add New Asset"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.name ? "border-red-500" : "border-gray-600"} rounded-md p-2 text-white`}
                placeholder="Bitcoin"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.symbol ? "border-red-500" : "border-gray-600"} rounded-md p-2 text-white`}
                placeholder="BTC"
              />
              {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.price ? "border-red-500" : "border-gray-600"} rounded-md p-2 text-white`}
                placeholder="30000"
                step="0.01"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Market Cap ($)</label>
              <input
                type="number"
                name="market_cap"
                value={formData.market_cap}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.market_cap ? "border-red-500" : "border-gray-600"} rounded-md p-2 text-white`}
                placeholder="500000000000"
              />
              {errors.market_cap && <p className="text-red-500 text-xs mt-1">{errors.market_cap}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">24h Volume ($)</label>
              <input
                type="number"
                name="volume_24h"
                value={formData.volume_24h}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.volume_24h ? "border-red-500" : "border-gray-600"} rounded-md p-2 text-white`}
                placeholder="25000000000"
              />
              {errors.volume_24h && <p className="text-red-500 text-xs mt-1">{errors.volume_24h}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">1h Change (%)</label>
              <input
                type="number"
                name="percent_change_1h"
                value={formData.percent_change_1h}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.percent_change_1h ? "border-red-500" : "border-gray-600"} rounded-md p-2 text-white`}
                placeholder="0.5"
                step="0.01"
              />
              {errors.percent_change_1h && <p className="text-red-500 text-xs mt-1">{errors.percent_change_1h}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">24h Change (%)</label>
              <input
                type="number"
                name="percent_change_24h"
                value={formData.percent_change_24h}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.percent_change_24h ? "border-red-500" : "border-gray-600"} rounded-md p-2 text-white`}
                placeholder="2.5"
                step="0.01"
              />
              {errors.percent_change_24h && <p className="text-red-500 text-xs mt-1">{errors.percent_change_24h}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">7d Change (%)</label>
              <input
                type="number"
                name="percent_change_7d"
                value={formData.percent_change_7d}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.percent_change_7d ? "border-red-500" : "border-gray-600"} rounded-md p-2 text-white`}
                placeholder="5.0"
                step="0.01"
              />
              {errors.percent_change_7d && <p className="text-red-500 text-xs mt-1">{errors.percent_change_7d}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {asset ? "Updating..." : "Adding..."}
                </>
              ) : asset ? (
                "Update Asset"
              ) : (
                "Add Asset"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssetForm

