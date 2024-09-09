import { NextApiRequest, NextApiResponse } from 'next';
import xml2js from 'xml2js';
import mockData from './mockData'

const trimmedMockData = mockData.trim();

export async function getMockData() {
  const result = await xml2js.parseStringPromise(trimmedMockData);
  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await getMockData();
  res.json(result);
}