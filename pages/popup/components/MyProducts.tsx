import { DndContext, closestCenter } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import { SortableItem } from './SortableItem';
import { toast } from 'react-hot-toast';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { cn, ToggleButton } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';

function MyProducts() {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const [products, setProducts] = useState<
    { id: string; productURL: string; imageURL: string; title: string; notes: string }[]
  >([]);
  const [isSortable, setIsSortable] = useState<boolean>(false);
  const addToCart = chrome.runtime.getURL('popup/addtocart.png');
  const sort = chrome.runtime.getURL('popup/sorting.png');
  const moon = chrome.runtime.getURL('popup/moon.png');
  const sun = chrome.runtime.getURL('popup/sun.png');

  useEffect(() => {
    chrome.storage.sync.get('idealCartProducts', result => {
      result.idealCartProducts && setProducts(result.idealCartProducts);
    });
    chrome.storage.sync.onChanged.addListener(changes => {
      if (changes.idealCartProducts) {
        setProducts(changes.idealCartProducts.newValue);
      }
    });
  }, []);

  const handleDeleteProduct = async (index: number) => {
    return new Promise<void>(resolve => {
      setProducts(prev => {
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
      setProducts(items => {
        const activeIndex = items.findIndex(item => item.id === active.id);
        const overIndex = items.findIndex(item => item.id === over.id);
        const finalArray = arrayMove(items, activeIndex, overIndex);
        chrome.storage.sync.set({ idealCartProducts: finalArray });
        return finalArray;
      });
    }
  }

  function updateProducts(results: any) {
    if (!results || results.length === 0) return;
    const data: { pageTitle: string; pageURL: string; imageURL: string } | null = results[0].result;
    if (!data) return;
    const { pageTitle, pageURL, imageURL } = data;
    const isDuplicate = products.some(item => item.productURL === pageURL);
    if (isDuplicate) {
      toast.error('Product already added to cart!');
      return;
    }
    const newProduct = {
      id: pageURL,
      productURL: pageURL,
      imageURL: imageURL,
      title: pageTitle,
      notes: '',
    };
    setProducts(prev => {
      chrome.storage.sync.set({
        idealCartProducts: [...prev, newProduct],
      });
      toast.success('Product added to cart!');
      return [...prev, newProduct];
    });
  }

  function extractMetaImages() {
    try {
      let imageURL: string | null = null;
      const pageURL = window?.location?.href;
      const pageTitle = document?.title;

      if (!pageURL || !pageTitle || pageURL.startsWith('chrome://')) return null;

      const isAmazon = window.location.hostname.includes('amazon');

      if (isAmazon) {
        // First look for Amazon product images in script tags
        const scriptTags = document.querySelectorAll('script');
        const amazonImageRegex = /(https:\/\/m\.media-amazon\.com\/[^"'\s]+\.jpg)/i;

        for (let i = 0; i < scriptTags.length; i++) {
          const scriptContent = scriptTags[i].textContent;
          const match = scriptContent?.match(amazonImageRegex);

          if (match && match[1]) {
            imageURL = match[1];
            break;
          }
        }
      }
      if (!imageURL) {
        const ogImageMeta =
          document.querySelector('meta[property="og:image"]') || document.querySelector('meta[name="og:image"]');
        if (ogImageMeta && ogImageMeta.getAttribute('content')) {
          imageURL = ogImageMeta.getAttribute('content');
        }
      }
      return { pageTitle: document.title, pageURL: window.location.href, imageURL };
    } catch (error) {
      return null;
    }
  }

  function handleAddToCart() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs) return;
      if (!tabs[0].id) return;
      chrome?.scripting?.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: extractMetaImages,
        },
        updateProducts,
      );
    });
  }

  const handleSaveNotes = async (index: number, notes: string) => {
    return new Promise<void>(resolve => {
      setProducts(prev => {
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
      setIsSortable(prev => !prev);
    }
  };
  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col h-[calc(100vh-6.5rem)] gap-2 w-full py-2 px-1 overflow-x-hidden overflow-y-scroll">
          <SortableContext items={products} strategy={verticalListSortingStrategy}>
            {products.length === 0 ? (
              <div className="w-full py-8 text-lg text-center opacity-60">Cart is Empty</div>
            ) : (
              products.map((language, index) => (
                <SortableItem
                  isLight={isLight}
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
      <div className="w-full flex flex-row gap-2 p-2 justify-end items-center font-semibold text-xs">
        <ToggleButton
          className={cn(
            'rounded-md flex items-center justify-center h-9 w-9',
            isLight
              ? 'bg-theme-dark/5 hover:bg-theme-dark/10 text-theme-dark'
              : 'bg-theme-light/10 hover:bg-theme-light/20 text-theme-light',
          )}>
          {isLight ? (
            <img
              src={moon}
              alt="moon"
              className={cn('cursor-pointer w-5 h-5 object-contain opacity-75', !isLight ? 'invert' : '')}
            />
          ) : (
            <img
              src={sun}
              alt="moon"
              className={cn('cursor-pointer w-5 h-5 object-contain opacity-75', !isLight ? 'invert' : '')}
            />
          )}
        </ToggleButton>
        <button
          onClick={handleSortable}
          className={cn(
            'rounded-md flex items-center justify-center h-9 w-9',
            isSortable
              ? isLight
                ? 'bg-theme-dark/10'
                : 'bg-theme-light/10'
              : isLight
                ? 'bg-theme-dark/5 hover:bg-theme-dark/10'
                : 'bg-theme-light/10 hover:bg-theme-light/20',
          )}>
          <img
            src={sort}
            alt="sort products"
            className={cn('cursor-pointer w-6 h-6 object-contain opacity-75', !isLight ? 'invert' : '')}
          />
        </button>
        <button
          onClick={handleAddToCart}
          className={cn(
            'rounded-md flex flex-row items-center justify-center h-9 px-2 w-auto gap-1',
            isLight
              ? 'bg-theme-dark hover:bg-theme-dark/90 text-theme-light'
              : 'bg-theme-light hover:bg-theme-light/90 text-theme-dark',
          )}>
          <p>Add to Cart</p>
          <img
            src={addToCart}
            alt="sort products"
            className={cn('cursor-pointer w-6 h-6 object-contain opacity-75', isLight ? 'invert' : '')}
          />
        </button>
      </div>
    </>
  );
}

export default MyProducts;
