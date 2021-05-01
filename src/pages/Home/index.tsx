import React from 'react';
import { useGlobal } from '../../hooks/useGlobal';

const Home: React.FC = () => {
  const { user } = useGlobal();

  return (
    <div>
      {user?.fullName}
    </div>
  );
};

export default Home;
