import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import notes from "../../../assets/img/notes.png";
import product from "../../../assets/img/product.png";
import drag from "../../../assets/img/drag.png";
import remove from "../../../assets/img/delete.png";
import save from "../../../assets/img/save.png";
import { sortableType } from "../utils/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export function SortableItem({
  id,
  data,
  index,
  sortable,
  SaveNotes,
  deleteProduct,
}: sortableType) {
  const editRef = useRef(null);
  const notesRef = useRef(null);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [fade, setFade] = useState<boolean>(false);
  const [editNotes, setEditNotes] = useState<string>("");
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
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
      toast.success("Product removed!");
    }, 500);
  };

  const handleEdit = () => {
    setEditIndex((prev) => {
      if (prev === -1) {
        setEditNotes(data.notes);
        return index;
      } else {
        setEditNotes("");
        return -1;
      }
    });
  };

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    (event.target as HTMLImageElement).onerror = null;
    (event.target as HTMLImageElement).src = product;
  };

  const handleEditNotes = (e: any) => {
    setEditNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    SaveNotes(index, editNotes);
    setEditIndex(-1);
    toast.success("Notes saved!");
  };

  return (
    <div
      ref={sortable ? setNodeRef : undefined}
      {...(sortable ? attributes : {})}
      {...(sortable ? listeners : {})}
      style={style}
      className={`${
        fade ? "opacity-0" : "opacity-100"
      } bg-zinc-50 rounded-lg flex flex-row items-center justify-between shadow-sm ${
        sortable ? "cursor-grab" : "transition-all duration-500"
      }`}
    >
      {sortable ? (
        <div className="flex flex-row items-center gap-3 p-2">
          <img
            src={data.imageURL === "" ? product : data.imageURL}
            alt={data.title}
            onError={handleError}
            className="w-24 h-24 object-cover rounded-lg cursor-grab"
          />
          <div className="flex items-center justify-center grow h-24 break-all overflow-y-scroll max-w-[200px]">
            {data.title}
          </div>
        </div>
      ) : editIndex === -1 ? (
        <a
          href={data.productURL}
          target="_blank"
          rel="noreferrer"
          className="flex flex-row items-center gap-3 p-2"
        >
          <img
            src={data.imageURL === "" ? product : data.imageURL}
            alt={data.title}
            onError={handleError}
            className="w-24 h-24 object-cover rounded-lg cursor-pointer"
          />
          <div className="flex items-center justify-center grow h-24 break-all overflow-y-scroll max-w-[200px]">
            {data.title}
          </div>
        </a>
      ) : (
        <div
          ref={notesRef}
          className="p-2 rounded-lg bg-neutral-100 text-sm flex flex-row grow items-center gap-2"
        >
          <textarea
            rows={4}
            placeholder="Add short note ..."
            value={editNotes}
            onChange={(e) => handleEditNotes(e)}
            className="p-2 outline-none rounded-md resize-none grow"
          />
          <div>
            <button
              onClick={handleSaveNotes}
              className="hover:bg-neutral-200 flex items-center justify-center rounded-md h-8 w-8"
            >
              <img
                src={save}
                alt="save"
                className="w-6 h-6 cursor-pointer opacity-75"
              />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-[2px] p-2">
        <button
          ref={editRef}
          onClick={handleEdit}
          className={`${sortable ? "invisible" : "visible"} ${
            editIndex === -1 ? "hover:bg-zinc-200" : "bg-zinc-200"
          } rounded-md flex items-center justify-center h-8 w-8`}
        >
          <img
            alt="notes"
            src={notes}
            className="cursor-pointer w-5 h-5 object-contain opacity-75"
          />
        </button>

        {sortable ? (
          <button className="hover:bg-zinc-200 rounded-md flex items-center justify-center h-8 w-8 cursor-grab">
            <img
              alt="drag"
              src={drag}
              className="cursor-grab w-5 h-5 object-contain opacity-75"
            />
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className="hover:bg-zinc-200 rounded-md flex items-center justify-center h-8 w-8"
          >
            <img
              alt="remove"
              src={remove}
              className="cursor-pointer w-5 h-5 object-contain opacity-75"
            />
          </button>
        )}
      </div>
    </div>
  );
}
