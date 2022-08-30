import React, { createContext, useState } from "react";

const OverviewContext = createContext();

export function OverviewProvider({children}) {
  const [name, setName] = useState('Manuel');

  return (
    <OverviewContext.Provider value={{ name }}>
      {children}
    </OverviewContext.Provider>
  )
}


export default OverviewContext;