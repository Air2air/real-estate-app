import axios from 'axios';

const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const getGptResponse = async (prompt: string): Promise<string> => {
  const response = await openaiApi.post('/chat/completions', {
    prompt,
    max_tokens: 2048,
    temperature: 0.5,
  });
  return response.data.choices[0].text;
};