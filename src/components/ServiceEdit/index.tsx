import React from 'react';
import Service from '../../contracts/models/Service';
import { EditService, ServiceRow } from './style';
import StyledInput from '../StyledInput/style';

interface ServiceEditProps {
  service: Service;
}

const ServiceEdit: React.FC<ServiceEditProps> = ({ service }) => (
  <EditService>
    <ServiceRow>
      <h3>{service.name}</h3>
      <StyledInput />
    </ServiceRow>
  </EditService>
);

export default ServiceEdit;
