export interface Transaction {
  id?: string;
  amount: number;
  type?: string;
  date: string; // можно использовать Date
  description?: string;
  category: string;
  isSynced: 0 | 1; // если ты хочешь отмечать, отправлен ли на сервер
}
