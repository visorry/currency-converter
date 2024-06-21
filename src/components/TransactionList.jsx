import React from 'react';
import './TransactionList.css'; 

const TransactionList = ({ transactions }) => (
  <div>
    <h3>Recent 5 Transactions</h3>
    <ul className="transaction-list">
      {transactions.map((trans, index) => {
        const [transactionDetails, date] = trans.split('|'); // Splitting transaction and date
        return (
          <li key={index}>
            <span className="transaction-details">{transactionDetails}</span>
            <span className="transaction-date">{date}</span>
          </li>
        );
      })}
    </ul>
  </div>
);

export default TransactionList;
