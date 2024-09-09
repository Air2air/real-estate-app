export interface Link {
  homedetails: string;
  graphsanddata: string;
  mapthishome: string;
  comparables: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface Zestimate {
  amount: {
    currency: string;
    _: string;
  };
  "last-updated": string;
  oneWeekChange: {
    deprecated: string;
  };
}

export interface Result {
  zpid: string;
  links: Link;
  address: Address;
  FIPScounty: string;
  useCode: string;
  taxAssessmentYear: string;
  taxAssessment: string;
  yearBuilt: string;
  lotSizeSqFt: string;
  finishedSqFt: string;
  bathrooms: string;
  bedrooms: string;
  totalRooms: string;
  lastSoldDate: string;
  lastSoldPrice: {
    currency: string;
    _: string;
  };
  zestimate: Zestimate;
  zindexValue: string;
  overallType: string;
  overallTypeSource: string;
  parcelId: string;
}

export interface Response {
  results: {
    result: Result[];
  };
}

export interface SearchResults {
  response: Response;
}
