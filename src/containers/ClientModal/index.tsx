import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import Client from '../../contracts/models/Client';
import StyledInput from '../../components/StyledInput/style';
import { createClient, updateClient } from '../../services/ClientService';
import { ClientFormStyled, ButtonsContainer } from './style';
import Button from '../../components/Button';

interface ClientModalProps {
  onClose: () => void;
  successCallback: () => void
  isOpen: boolean;
  client?: Client | null;
}

interface ClientForm {
  fullName: string;
  email: string;
  phone?: string;
  cpf?: string;
  cnpj?: string;
}

const ClientModal: React.FC<ClientModalProps> = ({
  client,
  onClose,
  successCallback,
  isOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    unregister,
  } = useForm<ClientForm>();
  const [fullName, setFullname] = useState<string|undefined>('');
  const [email, setEmail] = useState<string|undefined>('');
  const [phone, setPhone] = useState<string|undefined>('');
  const [cpf, setCPF] = useState<string|undefined>('');
  const [cnpj, setCNPJ] = useState<string|undefined>('');

  useEffect(() => {
    if (client?.fullName) setFullname(client.fullName);
    if (client?.email) setEmail(client.email);
    if (client?.cnpj) setCNPJ(client.cnpj);
    if (client?.cpf) setCPF(client.cpf);
    if (client?.phone) setPhone(client.phone);
  }, [isOpen]);

  const title = client !== null ? 'Editar cliente' : 'Novo cliente';

  const cleanState = () => {
    setFullname('');
    setEmail('');
    setPhone('');
    setCPF('');
    setCNPJ('');
  };

  const handleClose = () => {
    cleanState();
    unregister();
    reset();
    onClose();
  };

  const onSubmit = (form: ClientForm) => {
    const clientToSend: Client = { id: client?.id, ...form };

    if (client) {
      updateClient(clientToSend).then(() => {
        successCallback();
        handleClose();
      }).catch((err) => {
        switch (err.response.status) {
          case 409:
            toast.error('Já existe um usuário cadastrado com este e-mail/cpf');
            break;
          case 422:
            toast.error('Um dos campos está incorreto, tente novamente');
            break;
          default:
            toast.error('Houve um erro ao tentar fazer a requisição.'
              + 'Tente novamente mais tarde');
        }
      });
    } else {
      createClient(clientToSend).then(() => {
        successCallback();
        handleClose();
      }).catch((err) => {
        switch (err.response.status) {
          case 409:
            toast.error('Já existe um usuário cadastrado com este e-mail/cpf');
            break;
          case 422:
            toast.error('Um dos campos está incorreto, tente novamente');
            break;
          default:
            toast.error('Houve um erro ao tentar fazer a requisição.'
              + 'Tente novamente mais tarde');
        }
      });
    }
  };

  return (
    <BaseModal title={title} handleClose={handleClose} isOpen={isOpen}>
      <ClientFormStyled onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          label="Nome completo"
          variant="outlined"
          fullWidth
          value={fullName}
          error={errors.fullName !== undefined}
          helperText={errors.fullName && errors.fullName?.message}
          {...register('fullName', {
            required: 'Campo obrigatório',
          })}
          onChange={(e) => {
            register('fullName').onChange(e);
            setFullname(e.target.value);
          }}
        />
        <StyledInput
          type="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          value={email}
          error={errors.email !== undefined}
          helperText={errors.email && errors.email?.message}
          {...register('email', {
            required: 'Campo obrigatório',
          })}
          onChange={(e) => {
            register('email').onChange(e);
            setEmail(e.target.value);
          }}
        />
        <InputMask
          mask="99 99999-9999"
          value={phone}
          onChange={(e) => {
            register('phone').onChange(e);
            setPhone(e.target.value);
          }}
          onBlur={register('phone').onBlur}
        >
          {() => (
            <StyledInput
              label="Celular"
              variant="outlined"
              fullWidth
              error={errors.phone !== undefined}
              helperText={errors.phone && errors.phone?.message}
              {...register('phone')}
              onChange={undefined}
            />
          )}
        </InputMask>
        <InputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={(e) => {
            register('cpf').onChange(e);
            setCPF(e.target.value);
          }}
          onBlur={register('cpf').onBlur}
        >
          {() => (
            <StyledInput
              label="CPF"
              variant="outlined"
              fullWidth
              error={errors.cpf !== undefined}
              helperText={errors.cpf && errors.cpf?.message}
              {...register('cpf', {
                pattern: /(^(\d{3}\x2E){2}\d{3}\x2D\d{2})/,
              })}
              onChange={undefined}
            />
          )}
        </InputMask>
        <InputMask
          mask="99.999.999/9999-99"
          value={cnpj || undefined}
          onChange={(e) => {
            register('cnpj').onChange(e);
            setCNPJ(e.target.value);
          }}
          onBlur={register('cnpj').onBlur}
        >
          {() => (
            <StyledInput
              label="CNPJ"
              variant="outlined"
              fullWidth
              error={errors.cnpj !== undefined}
              helperText={errors.cnpj && errors.cnpj?.message}
              name={register('cnpj', {}).name}
            />
          )}
        </InputMask>
        <ButtonsContainer>
          <Button
            text="Cancelar"
            color="secondary"
            onClick={handleClose}
            type="button"
          />
          <Button text="Salvar" color="primary" type="submit" />
        </ButtonsContainer>
      </ClientFormStyled>
    </BaseModal>
  );
};

export default ClientModal;
