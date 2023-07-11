import React, { useState, createContext } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

export const ThemeContext = createContext<{
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  darkTheme: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDarkTheme: () => {},
});

function Options() {
  const [darkTheme, setDarkTheme] = useState(false);
  const value = { darkTheme, setDarkTheme };
  return (
    <ThemeContext.Provider value={value}>
      <div className="h-screen w-screen flex flex-row items-start bg-zinc-50">
        <LeftPanel />
        <RightPanel />
      </div>
    </ThemeContext.Provider>
  );
}

export default Options;
