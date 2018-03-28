import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <div className="header-wrap">
    <span className="ml-5"><Link to="/">Expense Recorder</Link></span>
  </div>
);
export default Header;
