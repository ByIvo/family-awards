export interface Message {
  datetime: Date;
  author: string;
  message: string;
};

export type Messages = Message[];