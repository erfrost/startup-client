import { MessageFile } from "../../interfaces";

export interface Message {
  message_id: string;
  chat_id: string;
  user_id: string;
  date: string;
  time: string;
  isRead: boolean;
  content: {
    text: string;
    files: MessageFile[];
    audio: MessageFile;
  };
}
