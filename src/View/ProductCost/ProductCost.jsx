import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductCost.css'

const ProductCost = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
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

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`http://localhost:4000/products?area=${selectedCategory}!A:C`)
        .then(res => setProducts(res.data))
        .catch(err => console.error('Error fetching products:', err));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (fromDate && toDate && selectedProduct) {
      const userDataString = localStorage.getItem('currentClient');
      const userData = JSON.parse(userDataString);
  
      if (!userData) {
        console.error('No user data available in localStorage');
        return;
      }

      axios.get(`http://localhost:4000/product-cost?from=${formatDate(fromDate)}&to=${formatDate(toDate)}&SubClintId=${userData.id}&product=${selectedProduct}`)
        .then(res => {
          setProductQuantities(res.data);  // Store fetched data in state
          console.log(res.data);             
        })
        .catch(err => console.error('Error on data fetching:', err));
    }
  }, [fromDate, toDate, selectedProduct]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  // const totalOrderCost = () => {
  //   return productQuantities.reduce((acc, item) => acc + Number(item.orderCost || 0), 0);
  // };
  return (
    <div className="dash-container">
      <div className="filter-container">
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
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price  per unit ($)</th>
            </tr>
          </thead>
          <tbody>
            {productQuantities.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.orderCost}.Rs</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductCost
