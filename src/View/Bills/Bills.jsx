import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bills.css'

const Bills = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fromDate, setFromDate] = useState('');
  
  const [productQuantities, setProductQuantities] = useState([]); 

  

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios.get('http://localhost:4000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);


  function fetchData() {
    if (fromDate && selectedCategory) {
      const userDataString = localStorage.getItem('currentClient');
      const userData = JSON.parse(userDataString);
  
      if (!userData) {
        console.error('No user data available in localStorage');
        return;
      }

      axios.get(`http://localhost:4000/bills?from=${formatDate(fromDate)}&SubClintId=${userData.id}&product=${selectedCategory}`)
        .then(res => {
          setProductQuantities(res.data);  // Store fetched data in state
          console.log(res.data);             
        })
        .catch(err => console.error('Error on data fetching:', err));
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const grandtotal = () => {
    return productQuantities.reduce((acc, item) => acc + Number(item.Total || 0), 0);
  };
  return (
    <div className="dash-container">
      <div className="filter-container">
        <div className="inputFilds">
          <input type="date" className="inputField form" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          <select value={selectedCategory} onChange={handleCategoryChange} className='inputFild'>
            <option value="">Select a Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          
        </div>
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Delivered Qty</th>
              <th>Price  per unit (Rs)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {productQuantities.map((item, index) => (
              <tr key={index}>
                <td>{item.ProductName}</td>
                <td>{item.DeliveredQty}</td>
                <td>{item.orderCost}.Rs</td>
                <td>{item.Total}</td>
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

export default Bills