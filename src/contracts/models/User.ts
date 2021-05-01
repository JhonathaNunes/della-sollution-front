export default interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  logout?: () => void;
}
