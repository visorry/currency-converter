import React from 'react';

const CurrencySelector = ({ label, currency, onChange, currencies }) => (
  <div>
    <label>{label}</label>
    <select value={currency} onChange={e => onChange(e.target.value)}>
      {Object.keys(currencies).map(code => (
        <option key={code} value={code}>
          {code} - {currencies[code] || 'Unknown'}
        </option>
      ))}
    </select>
  </div>
);

export default CurrencySelector;
