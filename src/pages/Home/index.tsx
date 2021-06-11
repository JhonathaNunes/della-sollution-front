import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import MainNavBar from '../../components/MainNavBar';
import { PageContainer, PageBody } from '../../containers/PageContainer/styled';
import Header from '../../components/Header';
import Order from '../../contracts/models/Order';
import { deleteOrder, getOrder } from '../../services/OrdersService';
import OrdersContainer from '../../containers/OrdersContainer';
// import OrderModal from '../../containers/OrderModal';

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [ordersState, setOrders] = useState<Order[]>([]);
  // const [modalIsOpen, setModalOpen] = useState(false);
  // const [orderModal, setOrderModal] = useState<Order>();

  const listOrders = () => {
    setLoading(true);

    getOrder()
      .then((response) => {
        const orders = response.data.map((data: any) => {
          // eslint-disable-next-line no-param-reassign
          data.client.fullName = data.client.full_name;
          return {
            ...data,
          };
        });

        setOrders(orders);
      })
      .catch(() => {
        toast.error('Houve um error ao carregar os pedidos');
      })
      .finally(() => setLoading(false));
  };

  const delOrder = (id: number) => {
    deleteOrder(id)
      .then(() => listOrders())
      .catch(() => {
        toast.error('Não foi possível deletar este pedido!');
      });
  };

  // const openEditModal = (order: Order) => {
  //   setModalOpen(true);
  //   setOrderModal(order);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  //   setOrderModal(undefined);
  // };

  useEffect(() => {
    setLoading(true);
    listOrders();
  }, []);

  return (
    <>
      <MainNavBar />
      <PageContainer>
        <Header title="Ordens de serviço" action={() => console.log()} />
        {isLoading ? (
          <div
            className="spinner-container"
            style={{ height: 'calc(100vh - 75px)' }}
          >
            <CircularProgress />
          </div>
        ) : (
          <PageBody>
            <OrdersContainer
              orders={ordersState}
              viewClick={() => console.log()}
              deleteClick={delOrder}
            />
          </PageBody>
        )}
      </PageContainer>
      {/* <OrderModal */}
      {/*  order={orderModal} */}
      {/*  onClose={closeModal} */}
      {/*  successCallback={listOrders} */}
      {/*  isOpen={modalIsOpen} */}
      {/* /> */}
    </>
  );
};

export default Home;
