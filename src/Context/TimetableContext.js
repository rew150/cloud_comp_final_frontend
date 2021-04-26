import React, { createContext, useState } from 'react';

export const TimetableContext = createContext();

export function TimetableProvider({ children }) {
  const [id, setId] = useState('');

  return (
    <TimetableContext.Provider value={{id, setId}}>
      {children}
    </TimetableContext.Provider>
  );
}
