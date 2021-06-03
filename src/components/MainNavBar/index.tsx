import React from 'react';
import { IconButton } from '@material-ui/core';
import { AiOutlineLogout } from 'react-icons/ai';
import { useGlobal } from '../../hooks/useGlobal';
import {
  NavBar, Logo, NavItems, NavItem, ProfileContainer,
} from './style';
import logo from '../../assets/images/logo_minified.png';

const MainNavBar: React.FC = () => {
  const { user } = useGlobal();

  return (
    <NavBar>
      <Logo src={logo} alt="Logo" />
      <NavItems>
        <NavItem to="/">Pedidos</NavItem>
        <NavItem to="/clientes">Clientes</NavItem>
        <NavItem to="/servicos">Serviços</NavItem>
        <NavItem to="/materiais">Materiais</NavItem>
      </NavItems>
      <ProfileContainer>
        <span className="user-label">{user?.fullName.split(' ', 1)[0]}</span>
        <IconButton
          onClick={() => user?.logout && user.logout()}
          aria-label="Logout"
          style={{ color: '#262626' }}
        >
          <AiOutlineLogout />
        </IconButton>
      </ProfileContainer>
    </NavBar>
  );
};

export default MainNavBar;
