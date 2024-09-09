
'use client'

import React, { useState } from "react";
import { getProperties } from "../pages/api/zillowApi";
import { getGptResponse } from "../pages/api/openaiApi";
import { SearchResults } from "../types/types";

interface Props {}

const RealEstateGPT: React.FC<Props> = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    address: "",
    city: "",
    state: "",
    zipcode: "",
    useMockData: false,
  });
  const [properties, setProperties] = useState<SearchResults>({
    response: { results: { result: [] } },
  });
  const [gptInput, setGptInput] = useState("");
  const [gptResponse, setGptResponse] = useState("");

  const handleSearchCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const handleSearch = async () => {
    const results = await getProperties(searchCriteria.useMockData);
    setProperties(results);
  };

  const handleGptSubmit = async () => {
    const response = await getGptResponse(gptInput);
    setGptResponse(response);
  };

  

  return (
    <div>
      <h1>Real Estate Listings and GPT Assistant</h1>
      <form>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={searchCriteria.address}
            onChange={handleSearchCriteriaChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={searchCriteria.city}
            onChange={handleSearchCriteriaChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={searchCriteria.state}
            onChange={handleSearchCriteriaChange}
          />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={searchCriteria.zipcode}
            onChange={handleSearchCriteriaChange}
          />
        </label>
        <label>
          Use Mock Data:
          <input
            type="checkbox"
            name="useMockData"
            checked={searchCriteria.useMockData}
            onChange={handleSearchCriteriaChange}
          />
        </label>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
      <form>
        <label>
          GPT Input:
          <input
            type="text"
            value={gptInput}
            onChange={(event) => setGptInput(event.target.value)}
          />
        </label>
        <button type="button" onClick={handleGptSubmit}>
          Submit
        </button>
      </form>
      <h2>Properties:</h2>
      <ul>
        {properties.response.results.result.map((property) => (
          <li key={property.zpid}>
            {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipcode}
          </li>
        ))}
      </ul>
      <h2>GPT Response:</h2>
      <p>{gptResponse}</p>
    </div>
  );
};

export default RealEstateGPT;