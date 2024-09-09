import axios from 'axios';
import xml2js from 'xml2js';
import { SearchResults } from '../../types/types';

export const zillowApi = axios.create({
  baseURL: 'https://api.zillow.com/webservice',
});

export const getProperties = async (useMockData: boolean): Promise<SearchResults> => {
  if (useMockData) {
    // This should not be here, it's only used in the getProperties function in the other file
    // const mockData = await import('./mockData.xml?raw');
    // const result: SearchResults = await xml2js.parseStringPromise(mockData);
    // return result;
    throw new Error("This function should not be used with mock data");
  } else {
    const response = await zillowApi.get('/GetSearchResults.htm', {
      params: {
        'zws-id': process.env.NEXT_PUBLIC_ZILLOW_API_KEY,
        citystatezip: 'New York, NY',
      },
    });
    const result: SearchResults = await xml2js.parseStringPromise(response.data);
    return result;
  }
};