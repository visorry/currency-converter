import React from 'react';

const AmountInput = ({ amount, onChange }) => (
  <div>
    <label>Amount</label>
    <input type="number" value={amount} onChange={e => onChange(e.target.value)} />
  </div>
);

export default AmountInput;
