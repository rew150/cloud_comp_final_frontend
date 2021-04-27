import React, { createContext, useState } from 'react';

export const TimetableContext = createContext();

export function TimetableProvider({ children }) {
  const [timeslot, setTimeslot] = useState('');

  return (
    <TimetableContext.Provider value={{timeslot, setTimeslot}}>
      {children}
    </TimetableContext.Provider>
  );
}
