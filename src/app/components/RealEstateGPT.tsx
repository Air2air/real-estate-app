import React, { useState } from 'react';
import { fetchZillowListing, getGptResponse, ZillowProperty } from '../lib/api';

const RealEstateGPT: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [cityStateZip, setCityStateZip] = useState<string>('');
  const [properties, setProperties] = useState<ZillowProperty[]>([]);
  const [gptInput, setGptInput] = useState<string>('');
  const [gptResponse, setGptResponse] = useState<string>('');

  const handleZillowSearch = async () => {
    const results = await fetchZillowListing(address, cityStateZip);
    setProperties(results);
  };

  const handleGptSubmit = async () => {
    const response = await getGptResponse(gptInput);
    setGptResponse(response);
  };

  return (
    <div>
      <h1>Real Estate Listings and GPT Assistant</h1>
      
      <div>
        <h2>Zillow Listings</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
        <input
          type="text"
          value={cityStateZip}
          onChange={(e) => setCityStateZip(e.target.value)}
          placeholder="Enter city, state, zip"
        />
        <button onClick={handleZillowSearch}>Search Listings</button>
        <ul>
          {properties.map((property, index) => (
            <li key={index}>
              {property.address}: ${property.price}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>GPT Assistant</h2>
        <input
          type="text"
          value={gptInput}
          onChange={(e) => setGptInput(e.target.value)}
          placeholder="Ask GPT something..."
        />
        <button onClick={handleGptSubmit}>Submit</button>
        <p>{gptResponse}</p>
      </div>
    </div>
  );
};

export default RealEstateGPT;