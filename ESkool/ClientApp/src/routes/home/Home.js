import HomeNav from '../../components/homenav/HomeNav';
import './home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import {useContext, useEffect} from "react";
import SessionStoreContext from "../../store/SessionStoreContext";
import Login from "../login/Login";
function Home() {
  const {userSession, setUserSession} = useContext(SessionStoreContext);
  useEffect(() => {
      setUserSession(localStorage.getItem('userSession'));
  }, [])
  
      if (localStorage.getItem('userSession') === '') {
          return <Login />
      } 
      else {
          return (
          <div className='outer-container'>
              <HomeNav/>
              <div className='container-home'>
                  <div className='container-sidebar-feed'>
                      <div className='container-sidebar'>
                          <Sidebar/>
                      </div>
                      <div className='container-feed'>
                          <Feed/>
                      </div>
                  </div>
              </div>
          </div>)
      }
  
}

export default Home;
