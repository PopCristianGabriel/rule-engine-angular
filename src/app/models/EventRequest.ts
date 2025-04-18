export interface EventRequest {
  userId: number;
  amount: number;
  eventType: string;
  date: string; // ISO string
}
