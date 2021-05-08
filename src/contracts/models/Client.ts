import Order from './Order';

export default interface Client {
  id?: number;
  fullName: string;
  email: string;
  phone: string | null;
  cpf: string | null;
  cnpj: string | null;
  orders?: Order[];
}
