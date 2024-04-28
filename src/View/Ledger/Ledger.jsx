import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ledger.css'

const Ledger = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [productQuantities, setProductQuantities] = useState([]); 


  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };



  useEffect(() => {
    if (fromDate && toDate) {
      const userDataString = localStorage.getItem('currentClient');
      const userData = JSON.parse(userDataString);
  
      if (!userData) {
        console.error('No user data available in localStorage');
        return;
      }

      axios.get(`http://localhost:4000/ledger?from=${formatDate(fromDate)}&to=${formatDate(toDate)}&SubClintId=${userData.id}`)
        .then(res => {
          setProductQuantities(res.data);  // Store fetched data in state
          console.log(res.data);             
        })
        .catch(err => console.error('Error on data fetching:', err));
    }
  }, [fromDate, toDate]);


  const grandtotal = () => {
    return productQuantities.reduce((acc, item) => acc + Number(item.Total || 0), 0);
  };
  return (
    <div className="dash-container">
      <div className="filter-container">
        <div className="inputFilds">
          <input type="date" className="inputField form" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          <input type="date" className="inputField to" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Bill No.</th>
              <th>Category</th>
              <th>Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {productQuantities.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.catBillNo}</td>
                <td>{item.category}</td>
                <td>{item.Total}.Rs</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">Grand Total</td>
              <td>{grandtotal()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Ledger