import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import MainNavBar from '../../components/MainNavBar';
import { PageContainer, PageBody } from '../../containers/PageContainer/styled';
import Header from '../../components/Header';
import Service from '../../contracts/models/Service';
import { deleteService, getService } from '../../services/ServiceService';
import ServicesContainer from '../../containers/ServicesContainer';
import ServiceModal from '../../containers/ServiceModal';

const Services = () => {
  const [isLoading, setLoading] = useState(false);
  const [servicesState, setServices] = useState<Service[]>([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [serviceModal, setServiceModal] = useState<Service>();

  const listServices = () => {
    setLoading(true);

    getService()
      .then((response) => {
        const services = response.data.map((data: any) => ({
          ...data, valueHour: +data.value_hour,
        }));

        setServices(services);
      })
      .catch(() => {
        toast.error('Houve um error ao carregar os serviços');
      })
      .finally(() => setLoading(false));
  };

  const delService = (id: number) => {
    deleteService(id)
      .then(() => listServices())
      .catch(() => {
        toast.error('Não foi possível deletar este serviço!');
      });
  };

  const openEditModal = (service: Service) => {
    setModalOpen(true);
    setServiceModal(service);
  };

  const closeModal = () => {
    setModalOpen(false);
    setServiceModal(undefined);
  };

  useEffect(() => {
    setLoading(true);
    listServices();
  }, []);

  return (
    <>
      <MainNavBar />
      <PageContainer>
        <Header title="Serviços" action={() => setModalOpen(true)} />
        {isLoading ? (
          <div
            className="spinner-container"
            style={{ height: 'calc(100vh - 75px)' }}
          >
            <CircularProgress />
          </div>
        ) : (
          <PageBody>
            <ServicesContainer
              services={servicesState}
              viewClick={openEditModal}
              deleteClick={delService}
            />
          </PageBody>
        )}
      </PageContainer>
      <ServiceModal
        service={serviceModal}
        onClose={closeModal}
        successCallback={listServices}
        isOpen={modalIsOpen}
      />
    </>
  );
};

export default Services;
