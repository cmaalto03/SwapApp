import React from "react";
import { useContext, createContext, useState } from "react";

const RegisterContext = createContext();

export function RegisterProvider({ children }) {
  const [userCred, setUserCred] = useState({
    school: undefined,
    name: undefined,
  });

  return (
    <RegisterContext.Provider value={{ userCred, setUserCred }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  return useContext(RegisterContext);
}
