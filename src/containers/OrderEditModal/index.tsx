import React from 'react';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import Order from '../../contracts/models/Order';
import ServiceEdit from '../../components/ServiceEdit';
import OrderStyled, { ButtonsContainer } from './style';
import Button from '../../components/Button';
import { finishOrder } from '../../services/OrdersService';

interface OrderEditModalProps {
  onClose: () => void;
  successCallback: () => void;
  isOpen: boolean;
  order?: Order;
}

const OrderEditModal: React.FC<OrderEditModalProps> = ({
  onClose,
  successCallback,
  isOpen,
  order,
}) => {
  const handleClose = () => {
    onClose();
    successCallback();
  };

  const endOrder = () => {
    finishOrder(order?.id ?? -1)
      .then(() => handleClose())
      .catch(() => {
        toast.error('Houve um erro ao adicionar essa ordem');
      });
  };

  return (
    <BaseModal
      title="Visualizar ordem de serviço"
      handleClose={() => handleClose()}
      isOpen={isOpen}
    >
      <OrderStyled>
        {order?.services.map((service) => (
          <ServiceEdit
            service={service}
            finished={order?.status === 'Finalizado'}
          />
        ))}
      </OrderStyled>
      {order?.status !== 'Finalizado'
        && (
        <ButtonsContainer>
          <Button
            text="Fechar"
            color="secondary"
            onClick={handleClose}
            type="button"
          />
          <Button
            text="Finalizar"
            color="primary"
            onClick={() => endOrder()}
          />
        </ButtonsContainer>
        )}
    </BaseModal>
  );
};

export default OrderEditModal;
