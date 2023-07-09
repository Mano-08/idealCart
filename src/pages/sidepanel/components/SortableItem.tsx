import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import notes from "../../../assets/img/notes.png";
import product from "../../../assets/img/product.png";
import drag from "../../../assets/img/drag.png";
import remove from "../../../assets/img/delete.png";
import { sortableType } from "../utils/types";
import { useRef, useState } from "react";

export function SortableItem({
  id,
  data,
  index,
  sortable,
  deleteProduct,
}: sortableType) {
  const [fade, setFade] = useState<boolean>(false);
  const notesRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleDelete = () => {
    setFade(true);
    setTimeout(async () => {
      setFade(false);
      await deleteProduct(index);
    }, 500);
  };

  return (
    <div
      ref={sortable ? setNodeRef : undefined}
      {...(sortable ? attributes : {})}
      {...(sortable ? listeners : {})}
      style={style}
      className={`${
        fade ? "opacity-0" : "opacity-100"
      } p-2 bg-zinc-50 rounded-lg flex flex-row gap-3 items-center shadow-sm ${
        sortable ? "cursor-grab" : "cursor-pointer transition-all duration-500"
      }`}
    >
      {sortable ? (
        <>
          <img
            src={data.imageURL === "" ? product : data.imageURL}
            alt={data.title}
            className="w-24 h-24 object-cover rounded-lg cursor-pointer"
          />

          <div>{data.title}</div>
        </>
      ) : (
        <a
          href={data.productURL}
          target="_blank"
          rel="noreferrer"
          className="flex flex-row gap-3 items-center"
        >
          <img
            src={data.imageURL === "" ? product : data.imageURL}
            alt={data.title}
            className="w-24 h-24 object-cover rounded-lg cursor-pointer"
          />

          <div>{data.title}</div>
        </a>
      )}
      <div className="flex flex-row items-center">
        <button
          ref={notesRef}
          disabled={sortable}
          className={`${
            sortable ? "invisible" : "visible"
          } hover:bg-zinc-200 rounded-md flex items-center justify-center h-8 w-8 opacity-80`}
        >
          <img
            alt="notes"
            src={notes}
            className="cursor-pointer w-5 h-5 object-contain"
          />
        </button>
        {sortable ? (
          <button className="hover:bg-zinc-200 rounded-md flex items-center justify-center h-8 w-8 opacity-80 cursor-grab">
            <img
              alt="drag"
              src={drag}
              className="cursor-grab w-5 h-5 object-contain"
            />
          </button>
        ) : (
          <button
            ref={deleteRef}
            onClick={handleDelete}
            className="hover:bg-zinc-200 rounded-md flex items-center justify-center h-8 w-8 opacity-80"
          >
            <img
              alt="remove"
              src={remove}
              className="cursor-pointer w-5 h-5 object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
}
