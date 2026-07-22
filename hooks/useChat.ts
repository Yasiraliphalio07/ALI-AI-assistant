'use client';
import { useState, useCallback } from 'react';
import { Message } from '@/types';
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const sendMessage = useCallback((content: string) => {
    const userMessage = { id: Date.now().toString(), role: 'user' as const, content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: content, includeSearch: true }) })
      .then(r => r.json()).then(data => {
        setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: data.response, timestamp: new Date() }]);
      }).finally(() => setIsLoading(false));
  }, []);
  return { messages, sendMessage, isLoading };
}