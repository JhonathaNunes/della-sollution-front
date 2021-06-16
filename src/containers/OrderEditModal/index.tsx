import React from 'react';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import Order from '../../contracts/models/Order';
import ServiceEdit from '../../components/ServiceEdit';

interface OrderEditModalProps {
  onClose: () => void;
  successCallback: () => void;
  isOpen: boolean;
  order?: Order;
}

const OrderEditModal: React.FC<OrderEditModalProps> = ({
  onClose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  successCallback,
  isOpen,
  order,
}) => {
  toast('Smooth Criminal');

  return (
    <BaseModal
      title="Visualizar ordem de serviço"
      handleClose={onClose}
      isOpen={isOpen}
    >
      {order?.services.map((service) => (
        <ServiceEdit service={service} />
      ))}
      {order?.client.email}
    </BaseModal>
  );
};

export default OrderEditModal;
