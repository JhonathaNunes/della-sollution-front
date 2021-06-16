import Material from './Material';

export default interface Service {
  id?: number;
  name: string;
  description: string;
  valueHour: number;
  materials?: Material[];
}
