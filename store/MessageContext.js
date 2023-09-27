import React from "react";
import { useContext, createContext, useState } from "react";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState();

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
