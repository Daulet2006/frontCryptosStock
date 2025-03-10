import React, { useEffect, useState } from "react";
import { Menu, Spin } from "antd";
import axios from "axios";
import CryptoCurrencyCard from "./components/CryptoCurrencyCard";
import Nav from "./components/NavBar.jsx";
import { useNavigate } from "react-router-dom";

export const CryptoCyrrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCryptoCurrencies = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/cryptocurrencies/"
      );
      const currenciesResponse = response.data;
      const menuItems = [
        {
          key: "g1",
          label: (
            <span className="font-semibold text-gray-400">
              List of Crypto Currencies
            </span>
          ),
          type: "group",
          children: currenciesResponse.map((c) => ({
            key: c.id.toString(),
            label: c.name,
          })),
        },
      ];

      setCurrencies(menuItems);
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
          <Menu
            onClick={onClick}
            mode="inline"
            items={currencies}
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

export default CryptoCyrrencies;
