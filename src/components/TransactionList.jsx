import React from 'react';

const TransactionList = ({ transactions }) => (
  <div>
    <h3>Last 5 Transactions</h3>
    <ul>
      {transactions.map((trans, index) => (
        <li key={index}>{trans}</li>
      ))}
    </ul>
  </div>
);

export default TransactionList;
