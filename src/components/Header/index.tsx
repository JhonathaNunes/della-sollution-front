import React from 'react';
import { HeaderStyled, ButtonContainer } from './style';
import Button from '../Button';

interface HeaderProps {
  title: string;
  action: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, action }) => (
  <HeaderStyled>
    <h2>{title}</h2>
    <ButtonContainer>
      <Button text="Novo" color="primary" onClick={action} />
    </ButtonContainer>
  </HeaderStyled>
);

export default Header;
