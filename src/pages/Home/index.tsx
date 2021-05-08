import React from 'react';
import MainNavBar from '../../components/MainNavBar';

const Home: React.FC = () => (
  <>
    <MainNavBar />
    <div className="spinner-container" style={{ height: 'calc(100vh - 75px)' }}>
      Orders
    </div>
  </>
);

export default Home;
