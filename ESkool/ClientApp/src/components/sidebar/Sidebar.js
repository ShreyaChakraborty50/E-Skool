import './sidebar.css';
import SidebarUpper from '../../components/sidebar/SidebarUpper';
import SidebarLower from '../../components/sidebar/SidebarLower';
function Sidebar() {
  return (
    <div className='sidebar-outer-container'>
      <div className='upper-container'>
        <SidebarUpper />
      </div>
      <div className='lower-container'>
        
      </div>
    </div>
  );
}

export default Sidebar;
