// Centralised domain types — import from here, not from individual components.

export type Region = 'na' | 'sa' | 'eu' | 'af' | 'as' | 'oc';

export interface Flower {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  origin: string;
  properties: string[];
  history: string;
  symbolism: string;
  bloomingSeason: string;
  colors: string[];
  imageUrl: string;
  regions: Region[];
}
