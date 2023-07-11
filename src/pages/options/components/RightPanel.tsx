import React from "react";
import monitor from "../../../assets/img/monitor.svg";

function RightPanel() {
  const height = window.innerHeight;
  const width = window.innerWidth;
  return (
    <div className="w-[80vw] flex flex-col gap-2 min-h-screen p-8 overflow-y-auto overflow-x-hidden">
      <div className="text-xl pt-12 underline font-medium">
        Configure Dimensions
      </div>
      <div className="w-full flex flex-col items-center bg-neutral-200 rounded-3xl p-5">
        <div className="relative">
          <img src={monitor} alt="monitor" className="w-[500px] h-auto" />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default RightPanel;
