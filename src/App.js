import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './View/login/login';
import Dashboard from './View/Dashboard/dashboard';
import PrivateRoute from './PrivateRoute'; // Import your PrivateRoute component
import ProductQuantity from './View/ProductQuantity/ProductQuantity';
import ProductCost from './View/ProductCost/ProductCost';
import Bills from './View/Bills/Bills';
import Ledger from './View/Ledger/Ledger';
import './App.css';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="product-quantity" element={<ProductQuantity />} />
            <Route path="product-cost" element={<ProductCost />} />
            <Route path="bills" element={<Bills />} />
            <Route path="ledger" element={<Ledger />} />
            <Route index element={<div>Welcome to the Dashboard</div>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  
  );
};

export default App;
