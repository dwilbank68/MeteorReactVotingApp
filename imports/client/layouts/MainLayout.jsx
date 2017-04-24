import React from 'react';
import PropTypes from 'prop-types';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react';
import {Link} from 'react-router';

// import MainLayout from './MainLayout.jsx';
// const MainLayout = (props) => {
const MainLayout = ({children}) =>
    <div className="main-layout">
        <header className="app">
            <h1><Link to="/">Level Up Voting</Link></h1>
            <LoginButtons/>
            <nav>
                <Link to="/about">About</Link>
            </nav>
        </header>
        {children}
    </div>

export default MainLayout;
