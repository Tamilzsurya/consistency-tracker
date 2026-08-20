import { Component } from 'react';

import HomeSidebar from '../../components/HomeSidebar';
import HomeTopNavbar from '../../components/HomeTopNavbar';

import './index.css';

class GridPage extends Component {
  render() {
    return (
        <div className="grid-page">
            <HomeSidebar />
            <HomeTopNavbar />
            <main className="grid-main-content">Grid Main content
            </main>
        </div>
    ) 
  }
}

export default GridPage;