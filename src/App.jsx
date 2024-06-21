import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConvertButton from './components/ConvertButton';
import TransactionList from './components/TransactionList';
import './App.css';

const API_BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1';

const App = () => {
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencies.json`);
      setCurrencies(response.data);
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
      fetchCurrenciesFallback();
    }
  };

  const fetchCurrenciesFallback = async () => {
    try {
      const response = await axios.get(`https://latest.currency-api.pages.dev/v1/currencies.json`);
      setCurrencies(response.data);
    } catch (error) {
      console.error('Failed to fetch currencies from fallback:', error);
      setError('Failed to fetch currencies from both sources.');
    }
  };

  const convertCurrency = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencies/${fromCurrency.toLowerCase()}.json`);
      const rate = response.data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
      
      if (rate && !isNaN(rate)) {
        const result = amount * rate;
        const transaction = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        const transactionWithDate = `${transaction} | ${new Date().toLocaleString()}`; // Append current date/time
        setTransactions([transactionWithDate, ...transactions.slice(0, 4)]);
        setError('');
      } else {
        throw new Error(`Invalid rate fetched for ${fromCurrency} to ${toCurrency}`);
      }
    } catch (error) {
      console.error('Failed to convert currency:', error);
      setError('Conversion failed. Please check the currency codes and try again.');
    }
  };

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      {error && <p className="error">{error}</p>}
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
      <AmountInput amount={amount} onChange={value => setAmount(value)} />
      <ConvertButton onClick={convertCurrency} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default App;
