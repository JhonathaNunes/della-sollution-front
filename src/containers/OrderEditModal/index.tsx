import React from 'react';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import Order from '../../contracts/models/Order';
import ServiceEdit from '../../components/ServiceEdit';
import OrderStyled, { ButtonsContainer } from './style';
import Button from '../../components/Button';
import { finishOrder } from '../../services/OrdersService';
import currencyFormatter from '../../utils/NumberFormatter';

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

  const totalServices = (): number => {
    let total = 0;

    order?.services.forEach((s) => {
      total += s.valueHour * (s.hoursWorked ?? 0);
    });

    return total;
  };

  const totalMaterials = (): number => {
    let total = 0;
    order?.services.forEach((service) => {
      service.materials?.forEach((material) => {
        total += material.uniqueValue + (material.qtd ?? 0);
      });
    });

    return total;
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
        ? (
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
        ) : (
          <div>
            <p>
              Total serviço:
              {' '}
              {currencyFormatter(totalServices())}
            </p>
            <p>
              Total materiais:
              {' '}
              {currencyFormatter(totalMaterials())}
            </p>
            <p>
              <b>
                Total:
                {' '}
                {currencyFormatter(totalMaterials() + totalServices())}
              </b>
            </p>
          </div>
        )}
    </BaseModal>
  );
};

export default OrderEditModal;
