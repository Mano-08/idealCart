export type sortableType = {
  id: string;
  sortable: boolean;
  data: {
    id: string;
    productURL: string;
    imageURL: string;
    title: string;
  };
  index: number;
  deleteProduct: any;
};
