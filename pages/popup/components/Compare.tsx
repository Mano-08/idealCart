import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Check, Info } from 'lucide-react';
import React from 'react';
import { cn, ToggleButton } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { CompareURLStorage, exampleThemeStorage } from '@extension/storage';

function Compare() {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [products, setProducts] = useState<
    { id: string; productURL: string; imageURL: string; title: string; notes: string }[]
  >([]);
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
    try {
      CompareURLStorage.set([]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const product = chrome.runtime.getURL('popup/product.png');

  function handleCompare() {
    const compareUrl = chrome.runtime.getURL('new-tab/index.html');
    const selectedProducts = selectedItems.map(index => products[index].productURL);
    CompareURLStorage.set(selectedProducts);
    chrome.tabs.create({
      url: compareUrl,
      active: true,
    });
  }

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-6.5rem)] gap-2 w-full py-2 px-1 overflow-x-hidden overflow-y-scroll">
        {products.length === 0 ? (
          <div className="w-full py-8 text-lg text-center opacity-60">Cart is Empty</div>
        ) : (
          <>
            <div
              className={cn(
                'rounded-lg flex flex-row items-center justify-between shadow-sm border-2 px-4 py-2 gap-3 border-solid',
                isLight
                  ? 'bg-neutral-200 border-neutral-300 text-neutral-600'
                  : 'bg-neutral-700 text-neutral-400 border-neutral-600',
              )}>
              <Info size={36} color={cn(isLight ? '#525252' : ' #a3a3a3')} />
              <p>
                Choose 2 or more products for comparison. The selected items will be displayed side by side in a new
                tab.
              </p>
            </div>
            {products.map((data, index) => (
              <button
                onClick={() =>
                  setSelectedItems(prev => {
                    if (prev.includes(index)) {
                      return prev.filter(item => item !== index);
                    } else {
                      return [...prev, index];
                    }
                  })
                }
                className={cn(
                  'rounded-lg flex flex-row items-center justify-between shadow-sm cursor-pointer',
                  isLight
                    ? selectedItems.includes(index)
                      ? 'bg-neutral-300'
                      : 'bg-neutral-100 hover:bg-neutral-200'
                    : selectedItems.includes(index)
                      ? 'bg-neutral-500'
                      : 'bg-neutral-800 hover:bg-neutral-700',
                )}>
                <div className="flex flex-row items-center gap-3 p-2">
                  <div className="min-w-24 w-24 h-24 flex-shrink-0">
                    <img
                      src={data.imageURL ?? product}
                      alt={data.title}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="grow line-clamp-4">{data.title}</div>
                </div>
                <div
                  className={cn(
                    'rounded-md flex items-center justify-center h-8 w-8 mr-4 cursor-grab',
                    !selectedItems.includes(index) && 'invisible',
                    isLight ? 'text-theme-dark' : 'text-theme-light',
                  )}>
                  <Check />
                </div>
              </button>
            ))}
          </>
        )}
      </div>
      <div className="w-full flex flex-row gap-2 p-2 justify-end items-center">
        <div className={cn(isLight ? 'text-theme-dark/70' : 'text-theme-light/70')}>
          {selectedItems.length} items selected
        </div>
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
          disabled={selectedItems.length < 2}
          onClick={handleCompare}
          className={cn(
            'rounded-md flex items-center justify-center font-semibold text-xs h-9 w-auto px-2 disabled:opacity-75 disabled:cursor-not-allowed',
            isLight
              ? 'bg-theme-dark hover:bg-theme-dark/90 text-theme-light'
              : 'bg-theme-light hover:bg-theme-light/90 text-theme-dark',
          )}>
          Compare
        </button>
      </div>
    </>
  );
}

export default Compare;
