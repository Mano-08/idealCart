import React, { useEffect, useState } from "react";
import sort from "../../../assets/img/sorting.png";
import addToCart from "../../../assets/img/addToCart.png";
import * as Tabs from "@radix-ui/react-tabs";
import { SortableItem } from "./SortableItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import toast from "react-hot-toast";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [isSortable, setIsSortable] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("idealCartProducts", (result) => {
      result.idealCartProducts && setProducts(result.idealCartProducts);
    });
  }, []);

  const handleDeleteProduct = async (index: number) => {
    return new Promise<void>((resolve) => {
      setProducts((prev) => {
        const updatedProducts = prev.filter((_, i) => i !== index);
        chrome.storage.local.set({ idealCartProducts: updatedProducts });
        resolve();
        return updatedProducts;
      });
    });
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setProducts((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        const finalArray = arrayMove(items, activeIndex, overIndex);
        chrome.storage.local.set({ idealCartProducts: finalArray });
        return finalArray;
      });
    }
  }

  function updateProducts(data: {
    pageTitle: string;
    pageURL: string;
    imageURL: string;
  }) {
    const { pageTitle, pageURL, imageURL } = data;
    const isDuplicate = products.some((item) => item.productURL === pageURL);
    if (isDuplicate) {
      toast.error("Product already added to cart!");
      return;
    }

    const newProduct = {
      id: pageURL,
      productURL: pageURL,
      imageURL: imageURL,
      title: pageTitle || "title",
    };
    setProducts((prev) => {
      chrome.storage.local.set({
        idealCartProducts: [...prev, newProduct],
      });
      return [...prev, newProduct];
    });
  }

  const handleAddToCart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { type: "captureData" }, (response) => {
        updateProducts(response);
      });
    });

    chrome.runtime.onMessage.addListener((request) => {
      if (request.message === "addToCart-Data") {
        updateProducts(request.data);
      }
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
            items={products}
            strategy={verticalListSortingStrategy}
          >
            {products.length === 0 ? (
              <div className="w-full py-8 text-lg text-center opacity-60">
                Cart is Empty
              </div>
            ) : (
              products.map((language, index) => (
                <SortableItem
                  key={language.id}
                  id={language.id}
                  index={index}
                  data={language}
                  sortable={isSortable}
                  deleteProduct={handleDeleteProduct}
                />
              ))
            )}
          </SortableContext>
        </div>
      </DndContext>

      <div className="w-full grow flex flex-row gap-2 p-2 justify-end items-center font-semibold text-white text-xs">
        <button
          onClick={handleAddToCart}
          className="hover:bg-zinc-200 bg-zinc-100 opacity-80 rounded-md flex items-center justify-center h-9 w-9"
        >
          <img
            src={addToCart}
            alt="sort products"
            className="cursor-pointer w-6 h-6 object-contain"
          />
        </button>
        <button
          onClick={() => setIsSortable((prev) => !prev)}
          className={`${
            isSortable ? "bg-zinc-200" : "bg-zinc-100 hover:bg-zinc-200"
          } opacity-80 rounded-md flex items-center justify-center h-9 w-9`}
        >
          <img
            src={sort}
            alt="sort products"
            className="cursor-pointer w-6 h-6 object-contain"
          />
        </button>
      </div>
    </Tabs.Content>
  );
}

export default MyProducts;
