import { DndContext, closestCenter } from "@dnd-kit/core";
import addToCart from "../../../assets/img/addToCart.png";
import sort from "../../../assets/img/sorting.png";
import React, { useEffect, useState } from "react";
import { SortableItem } from "./SortableItem";
import toast from "react-hot-toast";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function MyProducts() {
  const [products, setProducts] = useState<
    {
      id: string;
      productURL: string;
      imageURL: string;
      title: string;
      notes: string;
    }[]
  >([]);
  const [isSortable, setIsSortable] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get("idealCartProducts", (result) => {
      result.idealCartProducts && setProducts(result.idealCartProducts);
    });
    chrome.storage.sync.onChanged.addListener((changes) => {
      if (changes.idealCartProducts) {
        setProducts(changes.idealCartProducts.newValue);
      }
    });
  }, []);

  const handleDeleteProduct = async (index: number) => {
    return new Promise<void>((resolve) => {
      setProducts((prev) => {
        const updatedProducts = prev.filter((_, i) => i !== index);
        chrome.storage.sync.set({ idealCartProducts: updatedProducts });
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
        chrome.storage.sync.set({ idealCartProducts: finalArray });
        return finalArray;
      });
    }
  }

  const handleAddToCart = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      chrome.runtime.sendMessage(
        { action: "fetchOGImage", url: tab.url, tabId: tab.id },
        (response) => {
          const pageTitle = tab.title;
          const pageURL = tab.url;
          const imageURL = response.imageURL;
          const isDuplicate = products.some(
            (item) => item.productURL === pageURL
          );
          if (isDuplicate) {
            toast.error("Product already added to cart!");
            return;
          }
          const newProduct = {
            id: pageURL,
            productURL: pageURL,
            imageURL: imageURL,
            title: pageTitle,
            notes: "",
          };
          setProducts((prev) => {
            chrome.storage.sync.set({
              idealCartProducts: [...prev, newProduct],
            });
            toast.success("Product added to cart!");
            return [...prev, newProduct];
          });
        }
      );
    });
  };

  const handleSaveNotes = async (index: number, notes: string) => {
    return new Promise<void>((resolve) => {
      setProducts((prev) => {
        prev[index].notes = notes;
        chrome.storage.sync.set({ idealCartProducts: prev });
        resolve();
        return prev;
      });
    });
  };

  const handleSortable = () => {
    if (products.length === 0) {
      setIsSortable(false);
    } else {
      setIsSortable((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col p-4 pb-0 bg-white rounded-b-md outline-none">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col h-[27.5rem] gap-2 w-full p-1 overflow-x-hidden overflow-y-scroll">
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
                  SaveNotes={handleSaveNotes}
                  deleteProduct={handleDeleteProduct}
                />
              ))
            )}
          </SortableContext>
        </div>
      </DndContext>

      <div className="w-full flex flex-row gap-2 p-2 justify-end items-center font-semibold text-white text-xs">
        <button
          onClick={handleAddToCart}
          className="hover:bg-zinc-200 bg-zinc-100 rounded-md flex items-center justify-center h-9 w-9"
        >
          <img
            src={addToCart}
            alt="sort products"
            className="cursor-pointer w-6 h-6 object-contain opacity-75"
          />
        </button>
        <button
          onClick={handleSortable}
          className={`${
            isSortable ? "bg-zinc-200" : "bg-zinc-100 hover:bg-zinc-200"
          } rounded-md flex items-center justify-center h-9 w-9`}
        >
          <img
            src={sort}
            alt="sort products"
            className="cursor-pointer w-6 h-6 object-contain opacity-75"
          />
        </button>
      </div>
    </div>
  );
}

export default MyProducts;
