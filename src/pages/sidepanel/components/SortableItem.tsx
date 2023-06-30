import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { sortableType } from "../utils/types";

export function SortableItem({ id, data }: sortableType) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <a
      href={data.productURL}
      target="_blank"
      rel="noreferrer"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 bg-violet-50 rounded-md flex flex-row gap-2 items-center"
    >
      <img src={data.imageURL} alt={data.title} className="w-20 h-20" />
      <div>{data.title}</div>
    </a>
  );
}
