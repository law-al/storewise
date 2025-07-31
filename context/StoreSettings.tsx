import { createContext, useContext, useState } from "react";

type LogoContextType = {
  logo: string;
  setLogo: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
} | null;

export const StoreSettingsContext = createContext<LogoContextType>(null);

export default function LogoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logo, setLogo] = useState("/logo-png.png");
  const [theme, setTheme] = useState("light");
  return (
    <StoreSettingsContext.Provider value={{ logo, theme, setLogo, setTheme }}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useLogo() {
  const context = useContext(StoreSettingsContext);
  if (!context) {
    throw new Error("useLogo must be used within a LogoContextProvider");
  }
  return context;
}
