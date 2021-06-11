import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { deleteClient, getClient } from '../../services/ClientService';
import MainNavBar from '../../components/MainNavBar';
import Client from '../../contracts/models/Client';
import ClientsContainer from '../../containers/ClientsContainer';
import { PageContainer, PageBody } from '../../containers/PageContainer/styled';
import Header from '../../components/Header';
import ClientModal from '../../containers/ClientModal';

const Clients: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [clientsState, setClients] = useState<Client[]>([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [clientModal, setClientModal] = useState<Client|null>(null);

  const listClients = () => {
    getClient()
      .then((response) => {
        const clients = response.data.map((data: any) => {
          const client: Client = { fullName: data.full_name, ...data };

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

  const openEditModal = (client: Client) => {
    setModalOpen(true);
    setClientModal(client);
  };

  const closeModal = () => {
    setModalOpen(false);
    setClientModal(null);
  };

  useEffect(() => {
    setLoading(true);
    listClients();
  }, []);

  return (
    <>
      <MainNavBar />
      <PageContainer>
        <Header title="Clientes" action={() => setModalOpen(true)} />
        {isLoading ? (
          <div
            className="spinner-container"
            style={{ height: 'calc(100vh - 75px)' }}
          >
            <CircularProgress />
          </div>
        ) : (
          <PageBody>
            <ClientsContainer
              clients={clientsState}
              viewClick={openEditModal}
              deleteClick={deleteClients}
            />
          </PageBody>
        )}
      </PageContainer>
      <ClientModal
        client={clientModal}
        successCallback={listClients}
        onClose={closeModal}
        isOpen={modalIsOpen}
      />
    </>
  );
};

export default Clients;
