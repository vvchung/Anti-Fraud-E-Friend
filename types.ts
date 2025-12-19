
export type Language = 'zh-TW' | 'en' | 'zh-CN' | 'ja' | 'ko' | 'vi' | 'id' | 'th' | 'hi';

export interface FraudMethod {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  description: Record<Language, string>;
  indicators: Record<Language, string[]>;
  prevention: Record<Language, string[]>;
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
  scenario: Record<Language, string>;
  options: Record<Language, string[]>;
  correctIndex: number;
  explanation: Record<Language, string>;
}
