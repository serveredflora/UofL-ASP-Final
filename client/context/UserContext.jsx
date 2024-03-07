import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false, role: '' });

  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem("userToken"));
    const role = localStorage.getItem("userRole");
    setUser({ isLoggedIn, role });
  }, []);

  // Function to update user state
  const updateUserState = () => {
    const isLoggedIn = Boolean(localStorage.getItem("userToken"));
    const role = localStorage.getItem("userRole");
    setUser({ isLoggedIn, role });
  };

  return (
    <UserContext.Provider value={{ user, updateUserState }}>
      {children}
    </UserContext.Provider>
  );
};
