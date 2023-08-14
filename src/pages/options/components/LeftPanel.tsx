import React, { useContext } from "react";
import sun from "../../../assets/img/sun.png";
import moon from "../../../assets/img/moon.png";
import help from "../../../assets/img/help.png";
import { ThemeContext } from "../Options";

function LeftPanel() {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const handleSetTheme = () => setDarkTheme((prev) => !prev);
  return (
    <div className="flex flex-col items-center justify-between h-screen w-[20vw] p-7 ic-border-right">
      <span className="font-semibold text-3xl">idealCart</span>
      <div className="flex items-center justify-center">
        <div className="flex flex-col py-4 px-7 rounded-xl bg-zinc-100 text-base font-medium">
          <button
            onClick={handleSetTheme}
            className="flex flex-row items-center w-[153px] gap-2 py-2 px-4 rounded-lg hover:bg-zinc-200"
          >
            <img
              src={darkTheme ? sun : moon}
              alt={darkTheme ? "light mode" : "dark mode"}
              className="h-5 w-5 cursor-pointer"
            />
            <span>{darkTheme ? "Light mode" : "Dark mode"}</span>
          </button>
          <button className="flex flex-row items-center w-[153px] gap-2 py-2 px-4 rounded-lg hover:bg-zinc-200">
            <img src={help} alt="help" className="h-5 w-5 cursor-pointer" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
