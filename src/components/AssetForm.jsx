import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { addAsset, updateAsset } from "../services/api";

const AssetForm = ({ asset, onClose, onSuccess, z }) => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    price: "",
    user_id: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || "",
        symbol: asset.symbol || "",
        price: asset.price || "",
        user_id: asset.user_id || z[0].id,
      });
    }
  }, [asset]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.symbol.trim()) newErrors.symbol = "Symbol is required";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const numericFormData = {
        ...formData,
        price: Number.parseFloat(formData.price),
      };

      if (asset) {
        await updateAsset(asset.id, numericFormData);
        toast.success("Asset updated successfully!");
      } else {
        await addAsset(numericFormData);
        toast.success("Asset added successfully!");
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 select-none">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">
            {asset ? "Edit Asset" : "Add New Asset"}
          </h2>
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
                className={`w-full bg-gray-700 border ${
                  errors.name ? "border-red-500" : "border-gray-600"
                } rounded-md p-2 text-white`}
                placeholder="Bitcoin"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${
                  errors.symbol ? "border-red-500" : "border-gray-600"
                } rounded-md p-2 text-white`}
                placeholder="BTC"
              />
              {errors.symbol && (
                <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${
                  errors.price ? "border-red-500" : "border-gray-600"
                } rounded-md p-2 text-white`}
                placeholder="30000"
                step="0.01"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">User</label>
              <select
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white"
              >
                <option value="">Select User</option>
                {z.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
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
              {loading ? "Saving..." : asset ? "Update Asset" : "Add Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;
