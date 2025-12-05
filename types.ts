export interface FraudMethod {
  id: string;
  title: string;
  category: string;
  description: string;
  indicators: string[]; // Red flags
  prevention: string[];
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export type ViewState = 'home' | 'library' | 'chat' | 'quiz';

export interface QuizQuestion {
  id: number;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}