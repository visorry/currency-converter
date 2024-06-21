import React from 'react';

const CurrencySelector = ({ label, currency, onChange, currencies }) => (
  <div>
    <label>{label}</label>
    <select value={currency} onChange={e => onChange(e.target.value)}>
      {currencies.map(curr => (
        <option key={curr} value={curr}>{curr}</option>
      ))}
    </select>
  </div>
);

export default CurrencySelector;
