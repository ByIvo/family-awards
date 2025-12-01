export interface Message {
  datetime: Date;
  author: string;
  message: string;
};

export type Messages = Message[];

export type Processor = {
  name: string;
  run(messages: Messages): ProcessorResult;
}

export type ProcessorResult = {
  results: Record<string, any>;
  remanescent: Messages;
  processed: Messages;
};