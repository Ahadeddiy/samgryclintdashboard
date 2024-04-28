import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./SideBar.css";
import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { SiInfracost } from "react-icons/si";
import { LiaMoneyBillSolid, LiaFilePdfSolid } from "react-icons/lia";
import { BsQuestionCircle } from "react-icons/bs";
import { AuthContext } from '../../PrivateRoute';  // Ensure the path to PrivateRoute is correct



const Sidebar = ({ onMenuSelect }) => {
  const { verifyToken } = useContext(AuthContext);

  const handleLinkClick = async (event) => {
    await verifyToken();  // Re-verify the token on each click
    if (onMenuSelect) {
      onMenuSelect(event);  // Propagate the click event if needed
    }
  };

  return (
    <div className="sideBar gridDash" >
      <div className="menuDiv">
        <div className="logoDiv flex">
          <img src="https://goqxykdtxtuvhqcbkkpw.supabase.co/storage/v1/object/public/logos/samagry-square.svg" alt="Logo" />
          <h2>Samagry</h2>
        </div>
        <h3 className="divTitle">QUICK MENU</h3>
        <ul className='menuLists grid'>
          <li className='listItem'>
            <Link className='menuLink' to="/dashboard" onClick={handleLinkClick}>
              <MdDashboard className='icon' /><span className="samallText">Dashboard</span>
            </Link>
          </li>
          <li className='listItem'>
            <Link className='menuLink' to="/dashboard/product-quantity" onClick={handleLinkClick}>
              <MdProductionQuantityLimits className='icon' /><span className="samallText">Quantity Analysis</span>
            </Link>
          </li>
          <li className='listItem'>
            <Link className='menuLink' to="/dashboard/product-cost" onClick={handleLinkClick}>
              <SiInfracost className='icon' /><span className="samallText">Cost Analysis</span>
            </Link>
          </li>
          <li className='listItem'>
            <Link className='menuLink' to="/dashboard/bills" onClick={handleLinkClick}>
              <LiaMoneyBillSolid className='icon' /><span className="samallText">Bills</span>
            </Link>
          </li>
          <li className='listItem'>
            <Link className='menuLink' to="/dashboard/ledger" onClick={handleLinkClick}>
              <LiaFilePdfSolid className='icon' /><span className="samallText">Ledger</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sideBarCard">
        <BsQuestionCircle className='icon' />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Help Center</h3>
          <p>Having trouble in samagry, please contact us form for more questions.</p>
          <button className='btn' onClick={handleLinkClick}>Go to help center</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
