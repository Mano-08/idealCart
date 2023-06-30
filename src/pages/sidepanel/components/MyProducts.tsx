// import React, { useEffect, useState } from "react";
// import * as Tabs from "@radix-ui/react-tabs";
// import { SortableItem } from "./SortableItem";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// function MyProducts() {
//   const [languages, setLanguages] = useState([
//     {
//       id: "https",
//       productURL: "https",
//       imageURL: "htmp",
//       title: "title",
//     },
//     {
//       id: "htdtps",
//       productURL: "https",
//       imageURL: "htmp",
//       title: "title",
//     },
//   ]);

//   useEffect(() => {
//     chrome.storage.local.get("idealCartProducts", (result) => {
//       result.idealCartProducts && setLanguages(result.idealCartProducts);
//     });
//   }, []);

//   function handleDragEnd(event: any) {
//     console.log("Drag end called");
//     const { active, over } = event;
//     console.log("ACTIVE: " + active.id);
//     console.log("OVER :" + over.id);

//     if (active.id !== over.id) {
//       setLanguages((items) => {
//         const activeIndex = items.findIndex((item) => item.id === active.id);
//         const overIndex = items.findIndex((item) => item.id === over.id);
//         console.log(arrayMove(items, activeIndex, overIndex));
//         const finalArray = arrayMove(items, activeIndex, overIndex);
//         chrome.storage.local.set({ idealCartProducts: finalArray });
//         return finalArray;
//       });
//     }
//   }

//   const handleAddToCart = () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tab = tabs[0];
//       chrome.tabs.sendMessage(tab.id, "capture");
//     });
//   };

//   return (
//     <Tabs.Content
//       className="grow p-4 pb-0 bg-white rounded-b-md outline-none"
//       value="tab1"
//     >
//       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <div className="flex flex-col gap-2 h-[75vh] w-full p-1 overflow-x-hidden overflow-y-scroll">
//           <SortableContext
//             items={languages}
//             strategy={verticalListSortingStrategy}
//           >
//             {languages.map((language) => (
//               <SortableItem key={language.id} id={language.id} />
//             ))}
//           </SortableContext>
//         </div>
//       </DndContext>
//       <div className="w-full grow flex flex-row gap-2 p-2 justify-end items-center font-semibold text-white text-xs">
//         <button className="px-2 py-1.5 rounded-md bg-red-500 hover:bg-red-400">
//           Delete All
//         </button>
//         <button
//           onClick={handleAddToCart}
//           className="px-2 py-1.5 font-semibold text-white rounded-md bg-green-500 hover:bg-green-400"
//         >
//           Add to cart
//         </button>
//       </div>
//     </Tabs.Content>
//   );
// }

// export default MyProducts;

import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { SortableItem } from "./SortableItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function MyProducts() {
  const [languages, setLanguages] = useState([
    {
      id: "https",
      productURL: "https",
      imageURL: "htmp",
      title: "title",
    },
    {
      id: "htdtps",
      productURL: "https",
      imageURL: "htmp",
      title: "title",
    },
  ]);

  useEffect(() => {
    chrome.storage.local.get("idealCartProducts", (result) => {
      result.idealCartProducts && setLanguages(result.idealCartProducts);
    });
  }, []);

  function handleDragEnd(event: any) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        const finalArray = arrayMove(items, activeIndex, overIndex);
        chrome.storage.local.set({ idealCartProducts: finalArray });
        return finalArray;
      });
    }
  }

  const handleAddToCart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { type: "captureData" }, (response) => {
        const { pageTitle, pageUrl, imageURL } = response;
        const newProduct = {
          id: pageUrl,
          productURL: pageUrl,
          imageURL: imageURL,
          title: pageTitle || "title",
        };
        setLanguages((products) => {
          chrome.storage.local.set({
            idealCartProducts: [...products, newProduct],
          });
          return [...products, newProduct];
        });
      });
    });
  };

  return (
    <Tabs.Content
      className="grow p-4 pb-0 bg-white rounded-b-md outline-none"
      value="tab1"
    >
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-2 h-[75vh] w-full p-1 overflow-x-hidden overflow-y-scroll">
          <SortableContext
            items={languages}
            strategy={verticalListSortingStrategy}
          >
            {languages.map((language) => (
              <SortableItem
                key={language.id}
                id={language.id}
                data={language}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
      <div className="w-full grow flex flex-row gap-2 p-2 justify-end items-center font-semibold text-white text-xs">
        <button className="px-2 py-1.5 rounded-md bg-red-500 hover:bg-red-400">
          Delete All
        </button>
        <button
          onClick={handleAddToCart}
          className="px-2 py-1.5 font-semibold text-white rounded-md bg-green-500 hover:bg-green-400"
        >
          Add to cart
        </button>
      </div>
    </Tabs.Content>
  );
}

export default MyProducts;
