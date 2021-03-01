import './homenav.css';
import {useContext, useEffect, useState} from 'react';
import logo_nav_simple from '../../images/logo_nav_simple.png';
import home_nav_icon from '../../images/home_nav.gif';
import class_nav_icon from '../../images/class_nav.png';
import message_nav_icon from '../../images/message_nav.gif';
import notification_nav_icon from '../../images/notification_nav.gif';
import user_nav_icon from '../../images/user_nav.gif';
import {useHistory} from "react-router-dom";
import {Button, Menu, MenuItem} from "@material-ui/core";
import SessionStoreContext from "../../store/SessionStoreContext";


function HomeNav() {
  const history = useHistory();
  const {userSession, setUserSession} = useContext(SessionStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    setUserSession('');
    console.log('logout');
    localStorage.setItem('userSession', '');
    history.push('/login');
  }
  
  return (
    <div className='home-nav-container'>
      <div className='home-nav-container-items'>
        <div className='home-nav-container-logo'>
            <img src={logo_nav_simple} className='logo-nav' alt="home"/>
        </div>

        <div className='home-nav-container-menu'>
          <button className='nav-home-home' onClick={() => {
            history.push('/');
          }}>
            <img src={home_nav_icon} className='home-home-nav-icon' alt="home"/>
            <p>Home</p>
          </button>
          <button className='nav-classes' onClick={() => {
            history.push('/classes');
          }}>
            <img src={class_nav_icon} className='classes-nav-icon' alt="classes" />
            <p>Classes</p>
          </button>
          <button className='nav-messages'>
            <img src={message_nav_icon} className='messages-nav-icon' alt="messages" />
            <p>Messages</p>
          </button>
        </div>
      </div>
      <div className='home-nav-container-user'>
        <img src={notification_nav_icon} className='notification-nav-icon' />
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <img src={user_nav_icon} className='user-nav-icon'/>
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={() => {
            localStorage.setItem('userSession', '');
            localStorage.setItem('userSessionEmail', '');
            setUserSession('');
            history.push('/login');
          }}>Logout</MenuItem>
        </Menu>
        
      </div>
    </div>
  );
}

export default HomeNav;
