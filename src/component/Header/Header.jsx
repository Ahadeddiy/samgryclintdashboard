import React, { useState, useEffect } from 'react';
import './Header.css'; 
import { BiSearchAlt } from 'react-icons/bi';
import { MdOutlineNotificationsNone } from 'react-icons/md';

const Header = () => {
  const [selectedClient, setSelectedClient] = useState({id: "", name: ""});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.SubClint) {
        const firstClientKey = Object.keys(userData.SubClint)[0];
        const firstClient = userData.SubClint[firstClientKey];
        setSelectedClient({id: firstClient.Id, name: firstClient.Name});  // Store both ID and Name
      }
      const storedSearchText = localStorage.getItem('searchText');
      if (storedSearchText) {
        setSearchText(storedSearchText);
      }

      // Retrieve selected client from localStorage if available
      const storedClient = JSON.parse(localStorage.getItem('currentClient') || '{}');
      if (storedClient.id && storedClient.name) {
        setSelectedClient(storedClient);
      }
    } catch (e) {
      console.error("Error parsing user data", e);
    }
  }, []);

  const handleDropdownChange = (event) => {
    const selectedName = event.target.value;
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const selectedKey = Object.keys(userData.SubClint).find(key => userData.SubClint[key].Name === selectedName);
    const selectedId = userData.SubClint[selectedKey].Id;

    const newSelectedClient = {id: selectedId, name: selectedName};
    setSelectedClient(newSelectedClient);
    localStorage.setItem('currentClient', JSON.stringify(newSelectedClient));
  };

  const userDataString = localStorage.getItem('userData');
  
  
  const userData = JSON.parse(userDataString);// New state for storing product quantities
      console.log(userData.ClintName);

  // const handleSearchChange = (event) => {
  //   setSearchText(event.target.value);
  //   localStorage.setItem('searchText', event.target.value);
  // };

  const getClientOptions = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.SubClint) {
      return Object.keys(userData.SubClint).map(client => (
        <option key={client} value={userData.SubClint[client].Name}>{userData.SubClint[client].Name}</option>
      ));
    }
    return null;
  };

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to Samagry</h1>
          <p>Hello {userData.ClintName}, Welcome back!</p>
        </div>
        {/* <div className="searchBar flex">
          <input type="text" placeholder='Search Dashboard' value={searchText} onChange={handleSearchChange}/>
          <BiSearchAlt className='icon'/>
        </div> */}
        <div className="flex HeaderSide">
          <select value={selectedClient.name} onChange={handleDropdownChange} className="searchBar">
            {getClientOptions()}
          </select>
        </div>
        <div className="adminDiv flex">
          {/* <MdOutlineNotificationsNone className='icon'/> */}
          <img src="https://goqxykdtxtuvhqcbkkpw.supabase.co/storage/v1/object/public/icones/Avatar.webp" alt="Admin" className="adminImage"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
