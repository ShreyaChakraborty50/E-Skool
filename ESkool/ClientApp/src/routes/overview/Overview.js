import './overview.css';
import logo from '../../images/logo_nav_simple.png';
import wiseowl from '../../images/wiseowl.png';
import coverimg1 from '../../images/coverimg1.png';
import coverimg2 from '../../images/coverimg2.png';
import coverimg3 from '../../images/coverimg3.png';
import {useHistory} from "react-router-dom";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {useState} from "react";
import Classes from "../classes/Classes";

function Overview() {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    if (localStorage.getItem('userSession') !== '') {
        return <Classes />
    } else {
        return (
            <div className="overview-outer-container">
                <div className="overview-nav">
                    <div className="logo-section-nav">
                        <img src={wiseowl} alt="wiseowl-img" className="wiseowl-img"/>
                        <img src={logo} alt="cover image 1" className="logo-img"/>
                    </div>
                    <div className="menu-section-nav">
                        <Button size="large" style={{fontSize: "200px", fontWeight: "bolder"}}
                                aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Language
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>English</MenuItem>
                            <MenuItem onClick={handleClose}>Bangla</MenuItem>

                        </Menu>
                        <Button color="primary" size="large" style={{fontSize: "200px", fontWeight: "bolder"}}
                                onClick={() => {
                                    history.push('/login');
                                }}>Login</Button>
                    </div>
                </div>
                <hr/>
                <div className="cover1">
                    <div className="cover1-img-section">
                        <img src={coverimg1} alt="cover image 1" className="cover-img1"/>
                    </div>
                    <div className="cover1-text-section">
                        <h3 className="cover1-header-text">Explore the Learning Universe</h3>
                        <h3 className="cover1-tagline">Safe. Simple. Free!!</h3>
                        <button className="cover1-signup-button" onClick={() => {
                            history.push('/register');
                        }}>Sign up for a free account!
                        </button>
                    </div>
                </div>
                <div className="cover2">
                    <div className="cover2-text-section">
                        <h3 className="cover1-header-text">Tools for Teachers</h3>
                        <h4 className="cover2-tagline-text">Send messages, share class materials, and make learning
                            accessible anywhere. Save yourself time by bringing all your classroom tools together.</h4>
                    </div>
                    <div className="cover1-img-section">
                        <img src={coverimg2} alt="cover image 2" className="cover-img2"/>
                    </div>
                </div>
                <div className="cover3">
                    <img src={coverimg3} alt="cover image 3" className="cover-img3"/>
                    <div className="cover3-text-section">
                        <h3 className="cover1-header-text">Student Friendly Platform</h3>
                        <h4 className="cover3-tagline-text">Learn better together and become part of a vibrant classroom
                            community.Stay updated. Stay organized. See yourself grow.</h4>
                    </div>
                </div>
                <div className="cover2">
                    <div className="cover2-text-section">
                        <h3 className="cover1-header-text">For Everyone Who Needs</h3>
                        <h4 className="cover2-tagline-text">Roll out E-Skool to every user effortlessly, take advantage
                            of convenient language choice and built-in PDF maker.</h4>
                    </div>
                    <div className="cover1-img-section">
                        <img src={coverimg1} alt="cover image 1" className="cover-img2"/>
                    </div>
                </div>
                <hr/>
                <div className="footer">
                    <div className="footer-left-section">
                        <img src={logo} alt="logo footer"/>
                        <div className="footer-text-section">
                            <h4 className="footer-text">E-Skool is a online education platform that helps to connect all
                                learners with the people and resources needed to reach their full potential.</h4>
                        </div>
                    </div>
                    <div className="footer-right-section">
                        <h3 className="about-text">About Us</h3>
                        <h3 className="contact-text">Contact Us</h3>
                    </div>
                </div>
            </div>
        )
    }
}
export default Overview;