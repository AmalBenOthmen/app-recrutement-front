export interface Message {
  id?: number; // Optional because it may not be set initially
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
}
