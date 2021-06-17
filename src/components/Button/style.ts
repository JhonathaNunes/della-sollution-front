import styled from 'styled-components';

interface ButtonProps {
  color: 'primary' | 'secondary';
  isLoading?: boolean;
  onlyText?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 15px 35px;
  min-width: 110px;
  font-weight: lighter;
  font-size: 14px;
  color: ${
  (props) => (props.color === 'primary' ? '#ffffff' : '#4a40bf')
};
  background-color: ${
  (props) => (props.color === 'primary' ? '#4a40bf' : '#ffffff')
};
  ${(props) => (props.color === 'secondary' && !props.onlyText
    ? 'border: 1px solid #4a40bf;'
    : 'border: none;')
};
  
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  ${(props) => props.isLoading && 'opacity: 0.8;'}
`;

export default StyledButton;
