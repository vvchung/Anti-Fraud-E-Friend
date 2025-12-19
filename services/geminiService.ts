
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GET_SYSTEM_INSTRUCTION } from "../constants";
import { Language } from "../types";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const createChatSession = async (lang: Language): Promise<Chat> => {
  const ai = getClient();
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: GET_SYSTEM_INSTRUCTION(lang),
      temperature: 0.7,
    },
    history: [],
  });
};

export const sendMessageStream = async (
  chat: Chat,
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    const result = await chat.sendMessageStream({ message });
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) onChunk(c.text);
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
