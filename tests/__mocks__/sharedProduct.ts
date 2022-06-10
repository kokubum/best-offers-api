import * as faker from "faker";
import { Product, SharedProduct, User } from "../../src/models";

export function generateMockSharedProduct({
  id = faker.datatype.uuid(),
  createdAt = faker.date.past(),
  updatedAt = new Date(),
  stablishmentName = faker.name.firstName(),
  user = {} as User,
  product = {} as Product,
}):SharedProduct {
  const userId = user.id;
  return {
    id,
    stablishmentName,
    createdAt,
    updatedAt,
    user,
    product,
    userId
  };
}

export function generateMockSharedProductList({ count = 1 }):SharedProduct[] {
  const productsOfInterest:SharedProduct[] = [];

  for (let i = 0; i < count; i++) {
    productsOfInterest.push(generateMockSharedProduct({}));
  }

  return productsOfInterest;
}