"use client";

import React, { createContext } from "react";

type ToggleContextType = {
  toggleEditProfile: boolean;
  setToggleEditProfile: (value: boolean) => void;
} | null;

// 1) Create a context for toggling edit profile state
export const ToggleContext = createContext<ToggleContextType>(null);

// 2) Create a provider component that will hold the state and provide it to children components
export default function ToggleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggleEditProfile, setToggleEditProfile] = React.useState(false);

  return (
    <ToggleContext.Provider value={{ toggleEditProfile, setToggleEditProfile }}>
      {children}
    </ToggleContext.Provider>
  );
}

// 3) Create a custom hook to use the ToggleContext
export function useToggle() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleContextProvider");
  }
  return context; // returns the context value an object with toggleEditProfile and setToggleEditProfile
}
