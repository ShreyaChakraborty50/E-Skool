import HomeNav from "../../components/homenav/HomeNav";
import './classes.css';
import ClassesGrid from '../../components/classgrid/ClassesGrid'
function Classes() {
    return(
        <div className="classes-outer-container">
            <HomeNav />
            <div className="classes-navbar">
                <p className="class-management-nav">Class Management</p>
                <p className="whatsdue-nav">What's due</p>
                <p className="progress-nav">Progress</p>
            </div>
            <div className="classes-section">
                <ClassesGrid />
            </div>
        </div>
    );
}
export default Classes;