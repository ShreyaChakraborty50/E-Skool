import user_nav_icon from '../../images/user_nav.gif';
import completed_icon from '../../images/completed_icon.gif';
import {useContext, useEffect, useState} from "react";
import SessionStoreContext from "../../store/SessionStoreContext";
import './sidebarupper.css';
function UpperSidebar() {
  const {userSession, setUserSession} = useContext(SessionStoreContext);
  const [userSessionEmail, setUserSessionEmail] = useState(localStorage.getItem('userSessionEmail'));
  useEffect(() => {
      setUserSession(localStorage.getItem('userSession'));
  }, [])
  return (
    <div className='upper'>
      <div className='img-text-section'>
        <div className='img-section'>
          <img src={user_nav_icon} />
        </div>
        <div className='text-section'>
          <h4 style={{fontSize: "20px"}}>{userSession}</h4>
            <p style={{fontSize: "16px", marginBottom: "8px"}}>{userSessionEmail}</p>
          <p>View Profile</p>
        </div>
      </div>
      <hr className='divider-upper-sidebar' />
      <div className='profile-completed-section'>
        <img src={completed_icon} className='completed-icon' />
        <p>35% Profile Completed</p>
      </div>
    </div>
  );
}

export default UpperSidebar;
