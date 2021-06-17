import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import { InputLabel, MenuItem } from '@material-ui/core';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import { OrderFormStyled, ButtonsContainer } from './style';
import Button from '../../components/Button';
import StyledInput from '../../components/StyledInput/style';
import Service from '../../contracts/models/Service';
import { getClient } from '../../services/ClientService';
import Client from '../../contracts/models/Client';
import { getService } from '../../services/ServiceService';
import
StyledSelect, { StyledFormControl } from '../../components/StyledSelect/style';
import { createOrder } from '../../services/OrdersService';

interface OrderModalProps {
  onClose: () => void;
  successCallback: () => void;
  isOpen: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({
  onClose,
  successCallback,
  isOpen,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<number>();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [description, setDescription] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [cep, setCep] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [city, setCity] = useState<string>();

  const listClient = () => {
    getClient()
      .then((response) => {
        const clientsList = response.data.map((data: any) => {
          const client: Client = { fullName: data.full_name, ...data };

          return client;
        });

        setClients(clientsList);
      });
  };

  const listService = () => {
    getService()
      .then((response) => {
        const servicesList = response.data.map((data: any) => ({
          ...data, valueHour: +data.value_hour,
        }));

        setServices(servicesList);
      });
  };

  const handleSubmit = () => {
    const params = {
      description,
      client_id: selectedClient,
      services: selectedServices,
      address: {
        street,
        cep,
        number,
        city,
      },
    };

    createOrder(params)
      .then(() => {
        successCallback();
        onClose();
      })
      .catch(() => {
        toast.error(
          'Houve um erro ao adicionar a ordem de serviço, tente novamente',
        );
      });
  };

  useEffect(() => {
    listClient();
    listService();
  }, []);

  return (
    <BaseModal title="Nova ordem" handleClose={onClose} isOpen={isOpen}>
      <OrderFormStyled onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      >
        <StyledFormControl variant="outlined">
          <InputLabel id="clientLabel">Cliente</InputLabel>
          <StyledSelect
            labelId="clientLabel"
            fullWidth
            value={selectedClient}
            onChange={(e) => {
              setSelectedClient(e.target.value as number);
            }}
          >
            {clients.map((client) => (
              <MenuItem value={client.id}>{client.fullName}</MenuItem>
            ))}
          </StyledSelect>
        </StyledFormControl>
        <StyledInput
          label="Rua"
          variant="outlined"
          value={street}
          fullWidth
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
        <StyledInput
          label="Número"
          variant="outlined"
          value={number}
          fullWidth
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <StyledInput
          label="CEP"
          variant="outlined"
          value={cep}
          fullWidth
          onChange={(e) => {
            setCep(e.target.value);
          }}
        />
        <StyledInput
          label="Cidade"
          variant="outlined"
          value={city}
          fullWidth
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <StyledFormControl variant="outlined">
          <InputLabel id="servicesLabel">Serviços</InputLabel>
          <StyledSelect
            labelId="servicesLabel"
            fullWidth
            multiple
            value={selectedServices}
            onChange={(e) => {
              setSelectedServices(e.target.value as number[]);
            }}
          >
            {services.map((service) => (
              <MenuItem value={service.id}>{service.name}</MenuItem>
            ))}
          </StyledSelect>
        </StyledFormControl>
        <StyledInput
          label="Descrição"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          rowsMax={10}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <ButtonsContainer>
          <Button
            text="Cancelar"
            color="secondary"
            onClick={onClose}
            type="button"
          />
          <Button text="Salvar" color="primary" type="submit" />
        </ButtonsContainer>
      </OrderFormStyled>
    </BaseModal>
  );
};

export default OrderModal;
