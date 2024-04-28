import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import useAuth from '../../useAuth';  // Make sure the path is correct

function Login() {
  const videoUrl = 'https://goqxykdtxtuvhqcbkkpw.supabase.co/storage/v1/object/public/logos/8094267-hd_1920_1080_25fps.mp4';

  const navigate = useNavigate();
  const isAuthenticated = useAuth(navigate);  // Use custom hook for auth

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        console.log('User Data:', data.userData);
        localStorage.setItem('authToken', data.token); // Assuming your backend returns a token
        localStorage.setItem('userData', JSON.stringify(data.userData));
        alert("You're logged in!");

        navigate('/dashboard'); // Use navigate() to redirect to Dashboard
      } else {
        console.error('Login failed:', data.message);
        // Handle login failure (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle network errors or other unexpected errors
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="loginPage flex">
      <div className='container flex'>


        <div className="videoDiv">
        <video src={videoUrl} autoPlay muted loop></video>
        <div className="textDiv">
          <h2 className="title">
            Create And Sell Extraordinary Products
          </h2>
          <p>Adopt the peace of nature!</p>
        </div>

        <div className="footerDiv flex">
          <span className='text'>Don't have an account?</span>
          <Link to={'login'}>
            <button className='btn'>Sign Up</button>
          </Link>
        </div>
        </div>







        <div className="formDiv flex">
          <div className="headerDiv">
            <img src="https://goqxykdtxtuvhqcbkkpw.supabase.co/storage/v1/object/public/logos/samagry%20ICONpng.png" alt="Logo" className="login-logo" />
            <h3>Welcome Back!</h3>
          </div>
        




        <form onSubmit={handleSubmit} action="" className='form grid'>
          <span className='showMessage'>Login Status will go here</span>
          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
              <FaUserShield className='icon' />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter  your username'
                required

              />

            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="password">Password:</label>
            <div className="input flex">
              <BsFillShieldLockFill className='icon' />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Enter your password'
              />
            </div>
          </div>

          <button
            type="submit"
            className='btn flex'
          >
            <span>Login</span>
            <AiOutlineSwapRight className='icon' />
          </button>


          <span className='forgotPassword'>
            Forgot your password? <button style={{background: 'none', color: 'blue', border: 'none', padding: 0, font: 'inherit', borderBottom: '1px solid blue', cursor: 'pointer'}} >
    Click Here
</button>

          </span>

        </form>

        </div>

      </div>
    </div>
  );
}

export default Login;




//  {/* Logo added here using img tag */}
//  <div className="logo-container"> {/* Wrapper for better control */}
//  <img src="https://goqxykdtxtuvhqcbkkpw.supabase.co/storage/v1/object/sign/logos/Logo%20Open%20file-2%20copy%2010.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvcy9Mb2dvIE9wZW4gZmlsZS0yIGNvcHkgMTAuanBnIiwiaWF0IjoxNzEyMzE1NDA4LCJleHAiOjIwMjc2NzU0MDh9.9LvzP0GdGLWyMc4IODcGpdz5T5fARTmLPGVa9nhiEOg" alt="Logo" className="login-logo" />
// </div>
//    <h2>Login</h2>
//    <form onSubmit={handleSubmit} className="login-form">
//      <div>
//        <label htmlFor="username">username:</label>
//        <input
//          type="text"
//          id="username"
//          value={username}
//          onChange={(e) => setUsername(e.target.value)}
//          required
//        />
//      </div>
//      <div>
//        <label htmlFor="password">Password:</label>
//        <input
//          type="password"
//          id="password"
//          value={password}
//          onChange={(e) => setPassword(e.target.value)}
//          required
//        />
//      </div>
//      <button type="submit">Login</button>
//    </form>