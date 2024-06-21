import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConvertButton from './components/ConvertButton';
import TransactionList from './components/TransactionList';
import './App.css';

const API_BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencies.json`);
      setCurrencies(Object.keys(response.data));
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
      // Fallback mechanism if fetching from cdn.jsdelivr.net fails
      fetchCurrenciesFallback();
    }
  };

  const fetchCurrenciesFallback = async () => {
    try {
      const response = await axios.get(`https://latest.currency-api.pages.dev/v1/currencies.json`);
      setCurrencies(Object.keys(response.data));
    } catch (error) {
      console.error('Failed to fetch currencies from fallback:', error);
      // Handle error in UI
    }
  };

  const convertCurrency = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencies/${fromCurrency.toLowerCase()}.json`);
      const rate = response.data[toCurrency];
      const result = amount * rate;
      const transaction = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
      setTransactions([transaction, ...transactions.slice(0, 4)]);
    } catch (error) {
      console.error('Failed to convert currency:', error);
      // Handle error in UI
    }
  };

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <CurrencySelector
        label="From"
        currency={fromCurrency}
        onChange={setFromCurrency}
        currencies={currencies}
      />
      <CurrencySelector
        label="To"
        currency={toCurrency}
        onChange={setToCurrency}
        currencies={currencies}
      />
      <AmountInput amount={amount} onChange={setAmount} />
      <ConvertButton onClick={convertCurrency} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default App;
