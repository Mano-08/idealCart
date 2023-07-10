export type sortableType = {
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
};
