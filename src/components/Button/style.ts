import styled from 'styled-components';

interface ButtonProps {
  color: 'primary' | 'secondary';
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 15px 35px;
  min-width: 110px;
  font-weight: lighter;
  font-size: 14px;
  color: #ffffff;
  background-color: ${
  (props) => (props.color === 'primary' ? '#1976D2' : '#9A0036')
};
  border: none;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  ${(props) => props.isLoading && 'opacity: 0.8;'}
`;

export default StyledButton;
