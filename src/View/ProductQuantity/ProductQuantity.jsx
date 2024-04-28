import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../component/Loader/Loader'; // Adjust the path as necessary

import './ProductQuantity.css'

const ProductQuantity = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productQuantities, setProductQuantities] = useState([]);  // New state for storing product quantities
  const [isLoading, setIsLoading] = useState(false);


  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios.get('http://localhost:4000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`http://localhost:4000/products?area=${selectedCategory}!A:C`)
        .then(res => setProducts(res.data))
        .catch(err => console.error('Error fetching products:', err));
    }
  }, [selectedCategory]);

  function fetchData() {
    if (fromDate && toDate && selectedProduct) {
      setIsLoading(true);  // Start loading
      const userDataString = localStorage.getItem('currentClient');
      const userData = JSON.parse(userDataString);
   
      if (!userData) {
        console.error('No user data available in localStorage');
        setIsLoading(false);  // Stop loading if no user data
        return;
      }
   
      axios.get(`http://localhost:4000/product-quantity?from=${formatDate(fromDate)}&to=${formatDate(toDate)}&SubClintId=${userData.id}&product=${selectedProduct}`)
        .then(res => {
          setProductQuantities(res.data);
          console.log(res.data);
          setIsLoading(false);  // Stop loading on success
        })
        .catch(err => {
          console.error('Error on data fetching:', err);
          setIsLoading(false);  // Stop loading on error
        });
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  const totalOrderQty = () => {
    return productQuantities.reduce((acc, item) => acc + Number(item.orderQty || 0), 0);
  };
  return (
    <div className="dash-container">
      
          <div className="filter-container">
            {/* All your filters and inputs */}
            <div className="inputFilds">
              <input type="date" className="inputField form" value={fromDate} onChange={e => setFromDate(e.target.value)} />
              <input type="date" className="inputField to" value={toDate} onChange={e => setToDate(e.target.value)} />
              <select value={selectedCategory} onChange={handleCategoryChange} className='inputFild'>
                <option value="">Select a Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <select value={selectedProduct} onChange={handleProductChange} className='inputFild'>
                <option value="">Select a Product</option>
                {products.map((product, index) => (
                  <option key={index} value={product.name}>{product.price}</option>
                ))}
              </select>
              <button className='btn' onClick={fetchData}>Search</button>
            </div>
          </div>
          {isLoading ? (
      <div className="loader-container">
        <Loader />
      </div>
    ) : (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Order Quantity</th>
            </tr>
          </thead>
          <tbody>
            {productQuantities.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.orderQty}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{totalOrderQty()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )}
  </div>
);
  
}

export default ProductQuantity
