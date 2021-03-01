import HomeNav from '../../components/homenav/HomeNav';
import './classhome.css';
import Sidebar from '../../components/sidebar/Sidebar';
import ClassInformation from "../../components/classinformation/ClassInformation";
import Feed from '../../components/feed/Feed';
import {useContext, useEffect} from "react";
import SessionStoreContext from "../../store/SessionStoreContext";
import Login from "../login/Login";
import {useParams} from 'react-router-dom';
function ClassHome() {
    let {id} = useParams();
    console.log(id);
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
                            <ClassInformation />
                            <Feed/>
                        </div>
                    </div>
                </div>
            </div>)
    }

}

export default ClassHome;
