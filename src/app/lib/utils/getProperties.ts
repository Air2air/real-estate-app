import { SearchResults } from "@/app/types/types";
import { zillowApi } from "./../../pages/api/zillowApi";
import xml2js from "xml2js";

/**
 * Retrieves real estate properties based on the provided state.
 *
 * @param {string} state - The state for which to retrieve properties.
 * @return {Promise<SearchResults>} A promise that resolves to the search results.
 */
export const getProperties = async (state: string): Promise<SearchResults> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    const mockData = await import("./../../pages/api/mockData.xml");
    const result: SearchResults = await xml2js.parseStringPromise(
      mockData.default
    );
    return result;
  } else {
    const response = await zillowApi.get("/GetSearchResults.htm", {
      params: {
        "zws-id": process.env.NEXT_PUBLIC_ZILLOW_API_KEY,
        citystatezip: state,
      },
    });
    const result: SearchResults = await xml2js.parseStringPromise(
      response.data
    );
    return result;
  }
};