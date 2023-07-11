import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { tabs } from "./utils/helper";
import MyProducts from "./components/MyProducts";
import Compare from "./components/Compare";
import { Toaster } from "react-hot-toast";

function SidePanel() {
  return (
    <Tabs.Root
      className="flex flex-col h-screen w-screen shadow-[0_2px_10px] shadow-blackA4"
      defaultValue="tab1"
    >
      <Toaster position="bottom-left" reverseOrder={false} />
      <Tabs.List className="shrink-0 flex border-b border-mauve6">
        {tabs.map((element) => (
          <Tabs.Trigger
            className="bg-white h-12 flex-1 flex items-center justify-center text-[1rem] leading-none text-[rgb(0,0,0,0.8)] select-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:text-black data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative outline-none cursor-default"
            value={element.tab}
            key={element.tab}
          >
            {element.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="tab1">
        <MyProducts />
      </Tabs.Content>

      <Tabs.Content value="tab2">
        <Compare />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default SidePanel;
