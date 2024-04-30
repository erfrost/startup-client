import { Message } from "../../../app/models/message";

export const formattedDateArray = (messages: Message[]) => {
  return messages.map((message: Message) => {
    const date: Date = new Date(message.date);
    const newDate: string = `${date.getHours()}:${date.getMinutes()}`;
    return {
      ...message,
      time: newDate,
    };
  });
};

export const formattedDateObject = (message: Message) => {
  const date: Date = new Date(message.date);
  const newDate: string = `${date.getHours()}:${date.getMinutes()}`;
  return {
    ...message,
    time: newDate,
  };
};
