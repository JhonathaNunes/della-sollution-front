import React from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import BaseModal from '../BaseModal';
import Client from '../../contracts/models/Client';
import StyledInput from '../../components/StyledInput/style';
import { createClient } from '../../services/ClientService';
import { ClientFormStyled, ButtonsContainer } from './style';
import Button from '../../components/Button';

interface ClientModalProps {
  handleClose: () => void;
  successCallback: () => void
  isOpen: boolean;
  client?: Client | null;
}

interface ClientForm {
  fullName: string;
  email: string;
  phone: string | null;
  cpf: string | null;
  cnpj: string | null;
}

const ClientModal: React.FC<ClientModalProps> = ({
  client,
  handleClose,
  successCallback,
  isOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientForm>();
  const title = client !== null ? 'Editar cliente' : 'Novo cliente';

  const onSubmit = (form: ClientForm) => {
    const clientToSend: Client = { id: undefined, ...form };

    createClient(clientToSend).then(() => {
      successCallback();
      handleClose();
    }).catch();
  };

  return (
    <BaseModal title={title} handleClose={handleClose} isOpen={isOpen}>
      <ClientFormStyled onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          label="Nome completo"
          variant="outlined"
          fullWidth
          error={errors.fullName !== undefined}
          helperText={errors.fullName && errors.fullName?.message}
          {...register('fullName', {
            required: 'Campo obrigatório',
          })}
        />
        <StyledInput
          type="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          error={errors.email !== undefined}
          helperText={errors.email && errors.email?.message}
          {...register('email', {
            required: 'Campo obrigatório',
          })}
        />
        <InputMask
          mask="999.999.999-99"
          onChange={register('cpf').onChange}
          onBlur={register('cpf').onBlur}
        >
          {() => (
            <StyledInput
              label="CPF"
              variant="outlined"
              fullWidth
              name={register('cpf').name}
              ref={register('cpf').ref}
            />
          )}
        </InputMask>
        <InputMask
          mask="99.999.999/9999-99"
          onChange={register('cnpj').onChange}
          onBlur={register('cnpj').onBlur}
        >
          {() => (
            <StyledInput
              label="CNPJ"
              variant="outlined"
              fullWidth
              name={register('cnpj').name}
              ref={register('cnpj').ref}
            />
          )}
        </InputMask>
        <ButtonsContainer>
          <Button text="Cancelar" color="secondary" onClick={handleClose} />
          <Button text="Salvar" color="primary" type="submit" />
        </ButtonsContainer>
      </ClientFormStyled>
    </BaseModal>
  );
};

export default ClientModal;
