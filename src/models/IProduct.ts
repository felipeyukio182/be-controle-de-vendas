/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export const isProduct = (product?: object): product is IProduct => {
  if (!product) {
    return false;
  }
  return "id" in product && "name" in product && "price" in product;
};

export interface INewProduct extends Omit<IProduct, "id"> {}

export const isNewProduct = (product?: object): product is INewProduct => {
  if (!product) {
    return false;
  }
  return "name" in product && "price" in product;
};
