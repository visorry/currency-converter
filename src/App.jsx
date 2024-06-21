import React, { useState, useEffect } from 'react';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConvertButton from './components/ConvertButton';
import TransactionList from './components/TransactionList';
import './App.css';


///eafef

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
      .then(response => response.json())
      .then(data => setCurrencies(Object.keys(data)));
  }, []);

  const convertCurrency = () => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`)
      .then(response => response.json())
      .then(data => {
        const rate = data[toCurrency];
        const result = amount * rate;
        const transaction = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        setTransactions([transaction, ...transactions.slice(0, 4)]);
      });
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
