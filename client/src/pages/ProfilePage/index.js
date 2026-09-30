import { Component } from 'react';


// components
import HomeSidebar from '../../components/HomeSidebar';
import HomeTopNavbar from '../../components/HomeTopNavbar';
import ProfileMainContent from '../../components/ProfileMainContent'

import './index.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className="profile-page">
        <HomeSidebar />
        <HomeTopNavbar />
        <ProfileMainContent />
      </div>
    );
  }
}

export default ProfilePage;
