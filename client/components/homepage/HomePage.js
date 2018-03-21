import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

const HomePage = () => (
  <div className="homepage row-col-center">
    <div className="middle">
      <h1 className="h1">Welcome</h1>
      <button><Link to="">Click Here</Link></button>
    </div>
  </div>
);
export default HomePage;
