import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@extension/ui';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

type sortableType = {
  id: string;
  sortable: boolean;
  data: {
    id: string;
    productURL: string;
    imageURL: string;
    title: string;
    notes: string;
  };
  index: number;
  SaveNotes: (index: number, notes: string) => void;
  deleteProduct: any;
  isLight: boolean;
};

export function SortableItem({ id, data, index, sortable, SaveNotes, deleteProduct, isLight }: sortableType) {
  const editRef = useRef<HTMLButtonElement | null>(null);
  const notesRef = useRef<HTMLDivElement | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [fade, setFade] = useState<boolean>(false);
  const [editNotes, setEditNotes] = useState<string>('');
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const notes = chrome.runtime.getURL('popup/notes.png');
  const product = chrome.runtime.getURL('popup/product.png');
  const drag = chrome.runtime.getURL('popup/drag.png');
  const remove = chrome.runtime.getURL('popup/delete.png');
  const save = chrome.runtime.getURL('popup/save.png');

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      const element = e.target as HTMLElement;
      if (
        notesRef &&
        notesRef.current &&
        !notesRef.current.contains(element) &&
        editRef &&
        editRef.current &&
        !editRef.current.contains(element)
      ) {
        setEditIndex(-1);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleDelete = () => {
    setFade(true);
    setTimeout(async () => {
      setFade(false);
      await deleteProduct(index);
      toast.success('Product removed!');
    }, 500);
  };

  const handleEdit = () => {
    setEditIndex(prev => {
      if (prev === -1) {
        setEditNotes(data.notes);
        return index;
      } else {
        setEditNotes('');
        return -1;
      }
    });
  };

  const handleEditNotes = (e: any) => {
    setEditNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    SaveNotes(index, editNotes);
    setEditIndex(-1);
    toast.success('Notes saved!');
  };

  return (
    <div
      ref={sortable ? setNodeRef : undefined}
      {...(sortable ? attributes : {})}
      {...(sortable ? listeners : {})}
      style={style}
      className={cn(
        'rounded-lg flex flex-row items-center justify-between shadow-sm',
        fade ? 'opacity-0' : 'opacity-100',
        sortable ? 'cursor-grab' : 'transition-all duration-500',
        isLight ? 'bg-neutral-100 hover:bg-neutral-200' : 'bg-neutral-800 hover:bg-neutral-700',
      )}>
      {sortable ? (
        <div className="flex flex-row items-center gap-3 p-2">
          <div className="min-w-24 w-24 h-24 flex-shrink-0">
            <img
              src={data.imageURL ?? product}
              alt={data.title}
              className="w-full h-full object-cover rounded-lg cursor-grab"
            />
          </div>
          <div className="grow line-clamp-4">{data.title}</div>
        </div>
      ) : editIndex === -1 ? (
        <a href={data.productURL} target="_blank" rel="noreferrer" className="flex flex-row items-center gap-3 p-2">
          <div className="min-w-24 w-24 h-24 flex-shrink-0">
            <img
              src={data.imageURL ?? product}
              alt={data.title}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          </div>
          <div className="grow line-clamp-4">{data.title}</div>
        </a>
      ) : (
        <div
          ref={notesRef}
          className={cn(
            'p-2 rounded-lg text-sm flex flex-row grow items-center gap-2',
            isLight ? 'bg-theme-dark/5' : 'bg-theme-light/10',
          )}>
          <textarea
            rows={4}
            placeholder="Add short note ..."
            value={editNotes}
            onChange={e => handleEditNotes(e)}
            className="p-2 outline-none rounded-md resize-none grow text-theme-dark"
          />
          <div>
            <button
              onClick={handleSaveNotes}
              className={cn(
                'flex items-center justify-center rounded-md h-8 w-8',
                isLight ? 'hover:bg-theme-dark/10' : 'hover:bg-theme-light/20',
              )}>
              <img src={save} alt="save" className={cn('w-6 h-6 cursor-pointer', !isLight && 'invert opacity-55')} />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-[2px] p-2">
        <button
          ref={editRef}
          onClick={handleEdit}
          className={`${sortable ? 'invisible' : 'visible'} ${
            editIndex === -1
              ? isLight
                ? 'hover:bg-theme-dark/10'
                : 'hover:bg-theme-light/20'
              : isLight
                ? 'bg-theme-dark/5'
                : 'bg-theme-light/10'
          } rounded-md flex items-center justify-center h-8 w-8`}>
          <img
            alt="notes"
            src={notes}
            className={cn('cursor-pointer w-5 h-5 object-contain', !isLight && 'invert opacity-55')}
          />
        </button>

        {sortable ? (
          <button
            className={cn(
              'rounded-md flex items-center justify-center h-8 w-8 cursor-grab',
              isLight ? 'hover:bg-theme-dark/10' : 'hover:bg-theme-light/20',
            )}>
            <img
              alt="drag"
              src={drag}
              className={cn('cursor-grab w-5 h-5 object-contain', !isLight && 'invert opacity-55')}
            />
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className="hover:bg-red-500/30 rounded-md flex items-center justify-center h-8 w-8">
            <img
              alt="remove"
              src={remove}
              className={cn('cursor-pointer w-5 h-5 object-contain', !isLight && 'invert opacity-55')}
            />
          </button>
        )}
      </div>
    </div>
  );
}
