import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../component/SideBar/sidebar'; // Adjust the path as necessary
import Header from '../../component/Header/Header'; // Adjust the path as necessary
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container" >
        <Sidebar />
      <div className="main-content">
        <Header/>
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;
