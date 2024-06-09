import ProductModel from './product.model';
import { IProduct, SearchPayload } from './product.interface';

const createProductIntoDb = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsIntoDb = async (payload: SearchPayload) => {

  if (payload.name) {
    const searchTerm = payload.name;
    const result = await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { tags: { $elemMatch: { $regex: searchTerm, $options: 'i' } } },
      ],
    });
    return result;
  } else {
    const result = await ProductModel.find();
    return result;
  }
};
const getProductByIdInroDb = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};
const deleteProductByIdInroDb = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};
const updateProductByIdInroDb = async (
  productId: string,
  payload: Partial<IProduct>,
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, payload, {
    new: true,
  });
  return result;
};
export const productServices = {
  createProductIntoDb,
  getAllProductsIntoDb,
  getProductByIdInroDb,
  deleteProductByIdInroDb,
  updateProductByIdInroDb,
};
