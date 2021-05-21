import React, { ButtonHTMLAttributes } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import StyledButton from './style';

type ButtonProps = {
  text: string;
  isLoading?: boolean;
  color: 'primary' | 'secondary';
};

type allProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<allProps> = ({
  color, text, isLoading, ...props
}) => (
  <StyledButton
    color={color}
    disabled={isLoading}
    isLoading={isLoading}
    aria-label={text}
    {...props}
  >
    {isLoading ? <CircularProgress color="inherit" size={14} /> : text}
  </StyledButton>
);

export default Button;
