// src/context/BeerContext.tsx

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Beer {
  id: number;
  name: string;
  description: string;
  type: string;
  abv: number;
  rating: number;
  addedBy: string;
}

interface BeerContextType {
  beers: Beer[];
  addBeer: (beer: Beer) => void;
  deleteBeer: (id: number) => void; 
  updateBeer: (beer: Beer) => void;
}

const BeerContext = createContext<BeerContextType | undefined>(undefined);

export function BeerProvider({ children }: { children: ReactNode }) {
  const [beers, setBeers] = useState<Beer[]>([]);

  const addBeer = (beer: Beer) => {
    setBeers((prev) => [...prev, beer]);
  };

  const deleteBeer = (id: number) => {
    setBeers((prev) => prev.filter((beer) => beer.id !== id));
  };

  const updateBeer = (updatedBeer: Beer) => {
    setBeers((prev) =>
      prev.map((beer) => (beer.id === updatedBeer.id ? updatedBeer : beer))
    );
  };

  return (
    <BeerContext.Provider value={{ beers, addBeer, deleteBeer, updateBeer }}>
      {children}
    </BeerContext.Provider>
  );
}

export function useBeerContext() {
  const context = useContext(BeerContext);
  if (!context) {
    throw new Error('useBeerContext must be used inside a BeerProvider');
  }
  return context;
}
