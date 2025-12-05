import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Ideally, this should be a singleton or managed via a context, 
// but for this scope, we initialize on demand or lazily.

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
      throw new Error("API Key missing");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const createChatSession = async (): Promise<Chat> => {
  const ai = getClient();
  
  // Create chat session with system instruction
  // ai.chats.create is synchronous in the new SDK
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, // Balance between creative empathetic responses and factual advice
    },
    history: [
      {
        role: 'user',
        parts: [{ text: '你好，你是誰？' }],
      },
      {
        role: 'model',
        parts: [{ text: '你好！我是您的「防詐E友」。我這裡有最新的防詐騙資訊，也可以協助您辨識可疑訊息。如果您遇到任何疑似詐騙的情況，或者只是想了解更多防詐知識，隨時都可以問我喔！🛡️' }],
      },
    ],
  });

  return chat;
};

export const sendMessageStream = async (
  chat: Chat,
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    const result = await chat.sendMessageStream({
      message: message
    });

    for await (const chunk of result) {
      // Access text directly from the chunk as per guidance
      const c = chunk as GenerateContentResponse;
      const text = c.text; 
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};