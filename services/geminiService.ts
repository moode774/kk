import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const initializeClient = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const getFashionAdvice = async (query: string): Promise<string> => {
  const client = initializeClient();
  if (!client) {
    return "المعذرة، ما أقدر اتصل بالخادم حالياً. تأكد من مفتاح API.";
  }

  try {
    const model = client.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: `أنت مساعد تسوق شخصي سعودي خبير في الموضة والأزياء في متجر "فخامة".
      تتحدث باللهجة السعودية الودية والمحترمة.
      User Query: ${query}
      
      جاوب باختصار وبنصائح مفيدة تساعد المستخدم يختار المنتج المناسب. اقترح عليه أنواع منتجات عامة.`,
    });
    
    return response.text || "ما فهمت عليك، ممكن توضح أكثر؟";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "صار فيه خطأ بسيط، حاول مرة ثانية يا غالي.";
  }
};