import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Service from '../../contracts/models/Service';
import BaseModal from '../BaseModal';
import { ServiceFormStyled, ButtonsContainer } from './styled';
import StyledInput from '../../components/StyledInput/style';
import Button from '../../components/Button';
import { createService, updateService } from '../../services/ServiceService';

interface ServiceModalProps {
  onClose: () => void;
  successCallback: () => void;
  isOpen: boolean;
  service?: Service;
}

interface ServiceForm {
  name: string;
  description: string;
  valueHour: number;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  onClose,
  successCallback,
  isOpen,
  service,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    unregister,
    setValue,
  } = useForm<ServiceForm>();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [valueHour, setValueState] = useState<number>();

  useEffect(() => {
    if (isOpen) {
      if (service) {
        setName(service.name);
        setDescription(service.description);
        setValueState(service.valueHour);
        setValue('name', service.name);
        setValue('description', service.description);
        setValue('valueHour', service.valueHour);
      }
    }
  }, [isOpen]);

  const cleanState = () => {
    setName('');
    setDescription('');
    setValueState(undefined);
    setValue('name', '');
    setValue('description', '');
  };

  const handleClose = () => {
    cleanState();
    unregister();
    reset();
    onClose();
  };

  const onSubmit = (form: ServiceForm) => {
    const serviceToSend: Service = {
      id: service?.id,
      ...form,
      valueHour: +form.valueHour,
    };

    if (service) {
      updateService(serviceToSend).then(() => {
        successCallback();
        handleClose();
      }).catch((err) => {
        switch (err.response.status) {
          case 422:
            toast.error('Um dos campos está incorreto, tente novamente');
            break;
          default:
            toast.error('Houve um erro ao tentar fazer a requisição.'
              + 'Tente novamente mais tarde');
        }
      });
    } else {
      createService(serviceToSend).then(() => {
        successCallback();
        handleClose();
      }).catch((err) => {
        switch (err.response.status) {
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

  const title = service !== null ? 'Editar serviço' : 'Cadastrar serviço';

  return (
    <BaseModal title={title} handleClose={handleClose} isOpen={isOpen}>
      <ServiceFormStyled onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          label="Nome"
          variant="outlined"
          fullWidth
          value={name}
          error={errors.name !== undefined}
          helperText={errors.name && errors.name.message}
          {...register('name', {
            required: 'Campo obrigatório',
          })}
          onChange={(e) => {
            register('name').onChange(e);
            setName(e.target.value);
            setValue('name', e.target.value);
          }}
        />
        <StyledInput
          label="Valor hora"
          variant="outlined"
          fullWidth
          value={valueHour}
          type="number"
          inputProps={{ step: 0.01, max: 999.99 }}
          error={errors.valueHour !== undefined}
          helperText={errors.valueHour && errors.valueHour.message}
          {...register('valueHour', {
            required: 'Campo obrigatório',
          })}
          onChange={(e) => {
            register('valueHour').onChange(e);
            setValueState(+e.target.value);
            setValue('valueHour', +e.target.value);
          }}
        />
        <StyledInput
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          multiline
          rows={5}
          rowsMax={10}
          error={errors.description !== undefined}
          helperText={errors.description && errors.description.message}
          {...register('description', {
            required: 'Campo obrigatório',
          })}
          onChange={(e) => {
            register('description').onChange(e);
            setDescription(e.target.value);
            setValue('description', e.target.value);
          }}
        />
        <ButtonsContainer>
          <Button
            text="Cancelar"
            color="secondary"
            onClick={handleClose}
            type="button"
          />
          <Button text="Salvar" color="primary" type="submit" />
        </ButtonsContainer>
      </ServiceFormStyled>
    </BaseModal>
  );
};

export default ServiceModal;
