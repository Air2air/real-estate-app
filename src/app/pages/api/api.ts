import axios from "axios";
import xml2js from "xml2js";
import { getMockData } from './mock-data';

export interface ZillowProperty {
  address: string;
  price: string;
}

interface SearchResult {
  "searchResults": any;
}

// Zillow API configuration
const zillowApi = axios.create({
  baseURL: "https://api.zillow.com/webservice",
  params: {
    "zws-id": process.env.NEXT_PUBLIC_ZILLOW_API_KEY,
  },
});

export const fetchMockData = async () => {
  const result = await getMockData();
  return result;
};

export const fetchZillowListing = async (
  address: string,
  citystatezip: string,
  useMockData: boolean
): Promise<ZillowProperty[]> => {
  if (useMockData) {
    try {
      const result = await fetchMockData();
      if (result) {
        const parsedResult = await xml2js.parseStringPromise(result);
        return (parsedResult as SearchResult)["searchResults"].response[0].results[0].result.map((property: any) => ({
          address: property.address[0].street[0],
          price: property.zestimate[0].amount[0]._,
        }));
      } else {
        console.error("Error fetching mock data: result is undefined");
        return [];
      }
    } catch (error) {
      console.error("Error parsing mock data:", error);
      return [];
    }
  } else {
    try {
      const response = await zillowApi.get("/GetSearchResults.htm", {
        params: { address, citystatezip },
      });
      const result = await xml2js.parseStringPromise(response.data);
      return result[
        "searchResults"
      ].response[0].results[0].result.map((property: any) => ({
        address: property.address[0].street[0],
        price: property.zestimate[0].amount[0]._,
      }));
    } catch (error) {
      console.error("Error fetching Zillow data:", error);
      return [];
    }
  }
};

// OpenAI GPT API configuration
const openaiApi = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const getGptResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await openaiApi.post("/chat/completions", {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return "";
  }
};