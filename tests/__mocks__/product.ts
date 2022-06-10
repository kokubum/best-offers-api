import * as faker from "faker";
import { Product } from "../../src/models";

export function generateMockProduct({
  id = faker.datatype.uuid(),
  name = faker.name.firstName(),
  createdAt = faker.date.past(),
  updatedAt = new Date(),
  price = faker.datatype.number(1000),
  sharedProduct = undefined,
  stablishment = undefined
}):Product {
  return {
    id,
    name,
    price,
    sharedProduct,
    stablishment,
    createdAt,
    updatedAt,
  };
}

export function generateMockProductList({ count = 1 }):Product[] {
  const products:Product[] = [];

  for (let i = 0; i < count; i++) {
    products.push(generateMockProduct({}));
  }

  return products;
}