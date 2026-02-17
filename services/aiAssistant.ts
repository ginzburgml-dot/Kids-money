
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEncouragement = async (balance: number, goalCost: number, goalName: string, lang: 'en' | 'ru') => {
  try {
    const remaining = goalCost - balance;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `I am a friendly piggy bank. A child has $${balance} and wants a ${goalName} that costs $${goalCost}. They still need $${remaining}. Give a short, super encouraging, 1-sentence message to the child. Respond in ${lang === 'ru' ? 'Russian' : 'English'}. Use emojis!`,
    });
    return response.text || (lang === 'ru' ? "Продолжай в том же духе! Ты молодец! 🐷✨" : "Keep going! You are doing great! 🐷✨");
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'ru' ? "Ты становишься ближе к цели с каждым днем! 🌟" : "You're getting closer to your goal every day! 🌟";
  }
};

export const suggestNewChores = async (currentChores: string[], lang: 'en' | 'ru') => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 fun and easy chores for a child (ages 6-10) to earn pocket money. 
      Existing chores are: ${currentChores.join(", ")}. 
      The suggestions must be in ${lang === 'ru' ? 'Russian' : 'English'}.
      Return the output as a JSON array of objects with 'title', 'reward' (integer between 1-5), and 'emoji'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              reward: { type: Type.INTEGER },
              emoji: { type: Type.STRING }
            },
            required: ['title', 'reward', 'emoji']
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
