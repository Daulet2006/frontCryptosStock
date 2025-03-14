import React, { useEffect, useState } from "react";
import { Menu, Spin, Input } from "antd";
import axios from "axios";
import CryptoCurrencyCard from "./components/CryptoCurrencyCard";
import Nav from "./components/NavBar.jsx";

export const CryptoCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCryptoCurrencies = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/cryptocurrencies/"
      );
      const currenciesResponse = response.data;
      const menuItems = currenciesResponse.map((c) => ({
        key: c.id.toString(),
        label: c.name,
      }));

      setCurrencies(menuItems);
      setFilteredCurrencies(menuItems); // Initially show all
      if (currenciesResponse.length > 0) {
        setCurrencyId(currenciesResponse[0].id);
      }
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
    }
  };

  const fetchCurrency = async () => {
    if (!currencyId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/cryptocurrencies/${currencyId}`
      );
      setCurrencyData(response.data);
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = currencies.filter((currency) =>
      currency.label.toLowerCase().includes(query)
    );
    setFilteredCurrencies(filtered);
  };

  useEffect(() => {
    fetchCryptoCurrencies();
  }, []);

  useEffect(() => {
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(Number(e.key));
  };

  return (
    <div className="h-screen select-none flex flex-col">
      <Nav />
      <div className="flex">
        <div className="w-[220px] text-white h-screen overflow-y-auto p-2 shadow-lg">
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
            className="mb-2"
            allowClear
          />
          <Menu
            onClick={onClick}
            mode="inline"
            items={[
              {
                key: "g1",
                label: (
                  <span className="font-semibold text-gray-400">
                    List of Crypto Currencies
                  </span>
                ),
                type: "group",
                children: filteredCurrencies,
              },
            ]}
            defaultOpenKeys={["g1"]}
            className="bg-gray-800"
          />
        </div>

        <div className="flex-1 flex justify-center items-center">
          {loading ? (
            <Spin size="large" />
          ) : (
            <CryptoCurrencyCard currency={currencyData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoCurrencies;
