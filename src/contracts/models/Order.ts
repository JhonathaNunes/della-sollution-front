import Client from './Client';
import Service from './Service';
import Address from './Address';

export default interface Order {
  id: number;
  description: string;
  client: Client;
  services: Service[];
  address: Address;
  status: string;
}
