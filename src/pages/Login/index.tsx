import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useGlobal } from '../../hooks/useGlobal';
import {
  LoginContainer,
  FormContainer,
  StyledInput,
  ButtonContainer,
} from './style';
import Button from '../../components/Button';
import authenticate from '../../services/AuthService';
import { addData } from '../../services/LocalStorageService';
import User from '../../contracts/models/User';
import logo from '../../assets/images/logo.png';

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { setUser } = useGlobal();
  const history = useHistory();

  const onSubmit = (credentials: LoginForm) => {
    setIsLoading(true);

    authenticate(credentials.username, credentials.password)
      .then((response) => {
        if (response.data) {
          const user: User = {
            id: response.data.user.id,
            fullName: response.data.user.full_name,
            username: response.data.user.username,
            email: response.data.user.email,
          };

          addData('user', user);
          addData('accessToken', response.data.token);
          setUser(user);
          history.push('/');
        }
      })
      .catch((error) => {
        const errorMessage = error?.response?.status === 401
          ? 'Usuário e/ou senha incorretos'
          : 'Houve um erro no servidor';
        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <LoginContainer>
      <img src={logo} alt="Logo" />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          label="Usuário"
          variant="outlined"
          fullWidth
          error={errors.username !== undefined}
          helperText={errors.username && errors.username?.message}
          {...register('username', {
            required: 'Campo obrigatório',
          })}
        />
        <StyledInput
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          error={errors.password !== undefined}
          helperText={errors.password && errors.password?.message}
          {...register('password', {
            required: 'Campo obrigatório',
          })}
        />
        <ButtonContainer>
          <Button
            type="submit"
            color="primary"
            text="Login"
            isLoading={isLoading}
          />
        </ButtonContainer>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
