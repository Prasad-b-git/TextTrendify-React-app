// Footer.js
import React from 'react';
import './Footer.css';
//import PropTypes from 'prop-types';

function Footer(props) {
  return (
    <footer> 
    <div className="footer">
      
      <p>&copy; 2023 Soham Jagtap. All rights reserved.</p>
      <p>
        <a href="https://github.com/SOHAM2543" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {' | '}
        <a href="mailto:sohamvjagtap9750@gmail.com">Email</a>
        {' | '}
        <a href="https://www.linkedin.com/in/soham-jagtap-915909239/">LinkdIn</a>
      </p>

          
      </div>
    </footer>
  );
}

export default Footer;
