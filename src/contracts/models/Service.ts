import Material from './Material';

export default interface Service {
  id?: number;
  osId?: number;
  name: string;
  description: string;
  status?: string;
  valueHour: number;
  hoursWorked?: number;
  materials?: Material[];
}
