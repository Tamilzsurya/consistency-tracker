import { Component } from 'react';

import HomeSidebar from '../../components/HomeSidebar';
import HomeTopNavbar from '../../components/HomeTopNavbar';

import './index.css';

class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <HomeSidebar />
        <HomeTopNavbar />
        <main className="main-content">
            <section>
              <div></div>
              <div></div>
              <div></div>
            </section>

        </main>
      </div>
    );
  }
}

export default HomePage;