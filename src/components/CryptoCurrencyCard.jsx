//src.components.CryptoCurrencyCard.jsx
import { Card } from "antd";

function CryptoCurrencyCard({ currency }) {
  if (!currency) {
    return (
      <div className="text-gray-500 text-lg text-center mt-4">
        Select a cryptocurrency to see details
      </div>
    );
  }
  if (!currency?.quote?.USD) {
    return <div className="text-gray-500 text-lg text-center mt-4">No data available</div>;
  }
  

  const formatNumber = (num) => num.toLocaleString("en-US");
  const price = currency.quote.USD.price.toFixed(2);
  const marketCap = formatNumber(currency.quote.USD.market_cap);
  const volume = formatNumber(currency.quote.USD.volume_24h);
  const hourChange = currency.quote.USD.percent_change_1h.toFixed(2);
  const dayChange = currency.quote.USD.percent_change_24h.toFixed(2);
  const weekChange = currency.quote.USD.percent_change_7d.toFixed(2);
  const circulatingSupply = formatNumber(currency.circulating_supply);

  const getColorClass = (value) =>
    value > 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="select-none">
      <Card className="shadow-xl rounded-lg w-full max-w-4xl bg-gray-900 text-white p-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
          alt={currency.name}
          className="w-12 h-12 rounded-[50%]"
        />
        <h2 className="text-2xl font-bold">
          {currency.name} ({currency.symbol})
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6 text-center text-sm mt-6">
        <div>
          <p className="text-gray-400 text-lg">Price</p>
          <p className="text-xl font-semibold">${price}</p>
        </div>
        <div>
          <p className="text-gray-400 text-lg">1h %</p>
          <p className={`text-xl font-semibold ${getColorClass(hourChange)}`}>
            {hourChange}%
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-lg">24h %</p>
          <p className={`text-xl font-semibold ${getColorClass(dayChange)}`}>
            {dayChange}%
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-lg">7d %</p>
          <p className={`text-xl font-semibold ${getColorClass(weekChange)}`}>
            {weekChange}%
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-lg">Market Cap</p>
          <p className="text-xl font-semibold">${marketCap}</p>
        </div>
        <div>
          <p className="text-gray-400 text-lg">Volume (24h)</p>
          <p className="text-xl font-semibold">${volume}</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-lg">Circulating Supply</p>
        <p className="text-xl font-semibold">
          {circulatingSupply} {currency.symbol}
        </p>
      </div>
    </Card>
    </div>
  );
}

export default CryptoCurrencyCard;
