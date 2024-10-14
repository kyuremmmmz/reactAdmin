import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const [activePath, setActivePath] = useState('');

  return (
    <NavigationContext.Provider value={{ activePath, setActivePath }}>
      {children}
    </NavigationContext.Provider>
  );
};
