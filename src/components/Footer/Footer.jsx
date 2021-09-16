import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';



function Footer() {
  const user = useSelector((store) => store.user);

  return <footer>
            <img src="base_textlogo_transparent_background.png" alt="" />
            {/* {user.id && (
              <>
                <LogOutButton className="navLink" />
              </>
            )} */}
          </footer>;
}

export default Footer;
