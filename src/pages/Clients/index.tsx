import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { deleteClient, getClient } from '../../services/ClientService';
import MainNavBar from '../../components/MainNavBar';
import Client from '../../contracts/models/Client';
import Order from '../../contracts/models/Order';
import ClientsContainer from '../../containers/ClientsContainer';
import { ClientHolder, ClientBody } from './style';
import Header from '../../components/Header';
import ClientModal from '../../containers/ClientModal';

const Clients: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [clientsState, setClients] = useState<Client[]>([]);
  const [modalIsOpen, setModalOpen] = useState(false);

  const listClients = () => {
    getClient()
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
  };

  const deleteClients = (id: number) => {
    deleteClient(id)
      .then(() => listClients())
      .catch(() => {
        toast.error('Não foi possível deletar este cliente!');
      });
  };

  useEffect(() => {
    setLoading(true);
    listClients();
  }, []);

  return (
    <>
      <MainNavBar />
      <ClientHolder>
        <Header title="Cliente" action={() => setModalOpen(true)} />
        {isLoading ? (
          <div
            className="spinner-container"
            style={{ height: 'calc(100vh - 75px)' }}
          >
            <CircularProgress />
          </div>
        ) : (
          <ClientBody>
            <ClientsContainer
              clients={clientsState}
              viewClick={() => console.log('a')}
              deleteClick={deleteClients}
            />
          </ClientBody>
        )}
      </ClientHolder>
      <ClientModal
        successCallback={listClients}
        handleClose={() => setModalOpen(false)}
        isOpen={modalIsOpen}
      />
    </>
  );
};

export default Clients;
