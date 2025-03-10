
import { Edit, Trash2, ArrowUp, ArrowDown, Loader2 } from "lucide-react"

const AssetTable = ({ assets, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 select-none">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        <span className="ml-2 text-lg">Loading assets...</span>
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center select-none">
        <h3 className="text-xl font-medium mb-2">No assets found</h3>
        <p className="text-gray-400">Add your first crypto asset to get started.</p>
      </div>
    )
  }

  const renderPriceChange = (value) => {
    const isPositive = value >= 0
    const colorClass = isPositive ? "text-green-500" : "text-red-500"
    const Icon = isPositive ? ArrowUp : ArrowDown

    return (
      <div className={`flex items-center select-none ${colorClass}`}>
        <Icon className="h-4 w-4 mr-1" />
        <span>{Math.abs(value).toFixed(2)}%</span>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto select-none">
      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Market Cap
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              24h Volume
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">1h %</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">24h %</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">7d %</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium">{asset.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold">{asset.symbol}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm">${Number(asset.price).toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm">${Number(asset.market_cap).toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm">${Number(asset.volume_24h).toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{renderPriceChange(asset.percent_change_1h)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{renderPriceChange(asset.percent_change_24h)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{renderPriceChange(asset.percent_change_7d)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => onEdit(asset.id)}
                    className="p-1 rounded-full hover:bg-gray-600 transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5 text-blue-400" />
                  </button>
                  <button
                    onClick={() => onDelete(asset)}
                    className="p-1 rounded-full hover:bg-gray-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5 text-red-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AssetTable

