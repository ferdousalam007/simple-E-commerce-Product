//create product interface/type presenting a document in mongodb

export type Variants = {
  type: string;
  value: string;
};

export type Inventory = {
  quantity: number;
  inStock: boolean;
};

export type IProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variants[];
  inventory: Inventory;
};
