/** @format */

import type { Message } from '@/types/message';

// In a real app, this would be a database connection
// For this demo, we'll use an in-memory store
let messages: Message[] = [];

export function addMessage(
  message: Omit<Message, 'id' | 'receivedAt'>
): Message {
  const newMessage: Message = {
    ...message,
    id: Math.random().toString(36).substring(2, 15),
    receivedAt: new Date(),
  };

  messages.unshift(newMessage); // Add to beginning of array

  // Keep only the last 100 messages per phone number
  const phoneMessages = messages.filter(
    (m) => m.phoneNumber === message.phoneNumber
  );
  if (phoneMessages.length > 100) {
    const toRemove = phoneMessages.slice(100);
    messages = messages.filter(
      (m) =>
        m.phoneNumber !== message.phoneNumber ||
        !toRemove.some((r) => r.id === m.id)
    );
  }

  return newMessage;
}

export function getMessagesByPhoneNumber(phoneNumber: string): Message[] {
  return messages.filter((m) => m.phoneNumber === phoneNumber);
}

export function getAllPhoneNumbers(): string[] {
  return Array.from(new Set(messages.map((m) => m.phoneNumber)));
}
