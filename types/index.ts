export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  includeSearch?: boolean;
}

export interface ChatResponse {
  response: string;
  conversationId: string;
  searchResults?: SearchResult[];
}

export interface UserSettings {
  theme: 'light' | 'dark';
  autoSearch: boolean;
  memoryEnabled: boolean;
}
