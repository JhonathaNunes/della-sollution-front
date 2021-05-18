import Order from './Order';

export default interface Client {
  id?: number | null;
  fullName: string;
  email: string;
  phone: string | null;
  cpf: string | null;
  cnpj: string | null;
  orders?: Order[];
}
