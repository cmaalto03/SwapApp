import React from "react";
import { useContext, createContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState({ trade: true, cash: true });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
