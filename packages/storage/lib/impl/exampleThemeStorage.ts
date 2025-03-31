import type { BaseStorage } from '../base/index.js';
import { createStorage, StorageEnum } from '../base/index.js';

type Theme = 'light' | 'dark';
type CompareURLs = string[];

type ThemeStorage = BaseStorage<Theme> & {
  toggle: () => Promise<void>;
};

type CompareURLStorage = BaseStorage<CompareURLs> & {
  updateCompareURL: (urls: string[]) => Promise<void>;
};

const storage = createStorage<Theme>('theme-storage-key', 'light', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

const compareURLstorage = createStorage<string[]>('compare-storage-key', [], {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const CompareURLStorage: CompareURLStorage = {
  ...compareURLstorage,
  updateCompareURL: async (urls: string[]) => {
    await compareURLstorage.set(urls);
  },
};

export const exampleThemeStorage: ThemeStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentTheme => {
      return currentTheme === 'light' ? 'dark' : 'light';
    });
  },
};
