const API_BASE_URL = "http://localhost:5000/crypto_assets"

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "An error occurred with the API request")
  }
  return response.json()
}

// Get all crypto assets
export const fetchAssets = async () => {
  const response = await fetch(`${API_BASE_URL}/getAll`)
  return handleResponse(response)
}

// Get a single crypto asset by ID
export const fetchAssetById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/get/${id}`)
  return handleResponse(response)
}

// Add a new crypto asset
export const addAsset = async (assetData) => {
  const response = await fetch(`${API_BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assetData),
  })
  return handleResponse(response)
}

// Update an existing crypto asset
export const updateAsset = async (id, assetData) => {
  const response = await fetch(`${API_BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assetData),
  })
  return handleResponse(response)
}

// Delete a crypto asset
export const deleteAsset = async (id) => {
  const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
    method: "DELETE",
  })
  return handleResponse(response)
}

