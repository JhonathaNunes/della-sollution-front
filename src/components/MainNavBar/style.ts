import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBar = styled.header`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #f6f8f9;
  box-shadow: 0 -2px 6px #00000080;
`;

export const Logo = styled.img`
  width: 30px;
`;

export const NavItems = styled.nav`
  display: flex;
  flex: 1 1 auto;
  margin: 0 15px;
  height: 30px;
`;

interface NavItemProps {
  selected?: boolean;
}

export const NavItem = styled(Link)<NavItemProps>`
  color: #1976d2;
  text-decoration: none;
  width: 110px;
  text-align: center;
  line-height: 30px;
  ${(props) => props.selected && 'font-weight: 800;'}

  :active, :hover {
    filter: brightness(0.7);
  }
`;

export const ProfileContainer = styled.div`
  width: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .user-label {
    margin-right: 15px;
  }
`;
