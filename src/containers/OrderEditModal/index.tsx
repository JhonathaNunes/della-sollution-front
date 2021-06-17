import React from 'react';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import Order from '../../contracts/models/Order';
import ServiceEdit from '../../components/ServiceEdit';
import OrderStyled from './style';

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
  toast('Smooth Criminal');

  return (
    <BaseModal
      title="Visualizar ordem de serviço"
      handleClose={() => {
        onClose();
        successCallback();
      }}
      isOpen={isOpen}
    >
      <OrderStyled>
        {order?.services.map((service) => (
          <ServiceEdit service={service} />
        ))}
      </OrderStyled>
    </BaseModal>
  );
};

export default OrderEditModal;
