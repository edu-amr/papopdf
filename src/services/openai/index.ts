import { Configuration, OpenAIApi } from "openai-edge";

const openaiEdgeConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openaiEdge = new OpenAIApi(openaiEdgeConfig);