import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const FinanceManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transactions');
      setTransactions(response.data);
      console.log('Transactions fetched successfully.');
    } catch (error) {
      console.error('Failed to fetch transactions:', error.message, error.stack);
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('/budgets');
      setBudgets(response.data);
      console.log('Budgets fetched successfully.');
    } catch (error) {
      console.error('Failed to fetch budgets:', error.message, error.stack);
    }
  };

  // Chart data for budgets and expenditures
  const chartData = {
    labels: budgets.map(budget => budget.category),
    datasets: [
      {
        label: 'Budget',
        data: budgets.map(budget => budget.totalAmount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenditure',
        data: transactions.map(transaction => transaction.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Finance Management</h2>
      {/* Additional UI elements for adding, viewing, editing, and deleting transactions and budgets go here */}
      <Bar data={chartData} options={{
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default FinanceManagement;