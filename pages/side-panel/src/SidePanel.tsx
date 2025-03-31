import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import * as Tabs from '@radix-ui/react-tabs';
import { Toaster } from 'react-hot-toast';
import MyProducts from '../components/MyProducts';
import { cn } from '@extension/ui';

const SidePanel = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const tabs = [{ tab: 'products', title: 'My Products' }];

  return (
    <Tabs.Root
      className={cn(
        'App flex flex-col h-screen w-screen shadow-[0_2px_10px] ',
        isLight ? 'text-theme-dark/100 bg-theme-light shadow-blackA4' : 'text-theme-light bg-theme-dark shadow-white',
      )}
      defaultValue="products">
      <Tabs.List className="shrink-0 flex">
        {tabs.map(element => (
          <Tabs.Trigger
            className={cn(
              'h-12 flex w-1/2 justify-center items-center text-[1rem] leading-none select-none cursor-default border-b-2 border-none opacity-45 data-[state=active]:opacity-100 data-[state=active]:border-solid',
              isLight ? 'border-blackA9' : 'border-neutral-500',
            )}
            value={element.tab}
            key={element.tab}>
            {element.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Tabs.Content className="flex flex-col px-4 rounded-b-md outline-none" value="products">
        <MyProducts />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
