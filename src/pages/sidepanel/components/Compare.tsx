import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

function Compare() {
  return (
    <Tabs.Content
      className="grow p-5 bg-white rounded-b-md outline-none"
      value="tab2"
    >
      <div className="w-full h-full text-2xl bg-teal-100 font-thin">Tab2</div>
    </Tabs.Content>
  );
}

export default Compare;
