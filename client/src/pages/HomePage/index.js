
// components
import HomeSidebar from '../../components/HomeSidebar';
import HomeTopNavbar from '../../components/HomeTopNavbar';
import HomeMainContent from '../../components/HomeMainContent';


// css
import './index.css';

const HomePage = () =>  {

    
    return (
      <div className="home-page">
        <HomeSidebar />
        <HomeTopNavbar />

        {/* main Content */}
        <HomeMainContent />

      </div>
    );
  
}

export default HomePage;