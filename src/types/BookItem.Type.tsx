export type TBook = {
  _id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
  rating?: number;
  reviews?: number;
  bestseller?: boolean;
};
