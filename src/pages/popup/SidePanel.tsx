import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import MyProducts from "./components/MyProducts";
import { Toaster } from "react-hot-toast";

function SidePanel() {
  return (
    <Tabs.Root
      className="flex flex-col min-h-screen w-screen shadow-[0_2px_10px] shadow-blackA4 bg-white"
      defaultValue="tab1"
    >
      <Toaster position="bottom-left" reverseOrder={false} />
      {/* <Tabs.List className="shrink-0 flex border-b border-mauve6">
        {tabs.map((element) => (
          <Tabs.Trigger
            className="bg-white h-12 flex-1 flex items-center justify-center text-[1rem] leading-none text-[rgb(0,0,0,0.8)] select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:text-black data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative outline-none cursor-default"
            value={element.tab}
            key={element.tab}
          >
            {element.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List> */}

      <div className="bg-white h-12 flex w-1/2 shadow-[inset_0_-1px_0_0,0_1px_0_0] justify-center items-center text-[1rem] leading-none text-[rgb(0,0,0,0.8)] select-none cursor-default">
        My Products
      </div>

      <MyProducts />
    </Tabs.Root>
  );
}

export default SidePanel;
