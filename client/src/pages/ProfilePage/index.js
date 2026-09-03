import { Component } from 'react';

import HomeSidebar from '../../components/HomeSidebar';
import HomeTopNavbar from '../../components/HomeTopNavbar';

import './index.css';

class ProfilePage extends Component {
  render() {
    return (
      <div className="grid-page">
        <HomeSidebar />
        <HomeTopNavbar />
        <main className="grid-main-content">
          Profile Main content
        </main>
      </div>
    );
  }
}

export default ProfilePage;
