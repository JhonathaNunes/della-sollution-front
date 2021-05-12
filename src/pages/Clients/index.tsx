import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { get } from '../../services/ClientService';
import MainNavBar from '../../components/MainNavBar';
import Client from '../../contracts/models/Client';
import Order from '../../contracts/models/Order';
import ClientsContainer from '../../containers/ClientsContainer';
import { ClientHolder, ClientBody } from './style';
import Header from '../../components/Header';

const Clients: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [clientsState, setClients] = useState<Client[]>([]);

  useEffect(() => {
    setLoading(true);
    get()
      .then((response) => {
        const clients = response.data.map((data: any) => {
          const orders = data.orders.map((o: any) => {
            const order: Order = { ...o };

            return order;
          });

          const client: Client = { fullName: data.full_name, orders, ...data };

          return client;
        });

        setClients(clients);
      })
      .catch(() => {
        toast.error('Houve um erro ao carregar os clientes');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <MainNavBar />
      <ClientHolder>
        <Header title="Client" action={() => console.log('Clicou')} />
        {isLoading ? (
          <div
            className="spinner-container"
            style={{ height: 'calc(100vh - 75px)' }}
          >
            <CircularProgress />
          </div>
        ) : (
          <ClientBody>
            <ClientsContainer clients={clientsState} />
          </ClientBody>
        )}
      </ClientHolder>
    </>
  );
};

export default Clients;
