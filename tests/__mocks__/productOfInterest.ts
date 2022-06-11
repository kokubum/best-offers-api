import * as faker from "faker";
import { Product, ProductOfInterest, User } from "../../src/models";

export function generateMockProductOfInterest({
  id = faker.datatype.uuid(),
  createdAt = faker.date.past(),
  updatedAt = new Date(),
  startPrice = faker.datatype.number(1000),
  endPrice = faker.datatype.number(100000),
  activateForThirdUsers = false,
  user = {} as User,
  product = {} as Product,
  alert = false,
}):ProductOfInterest {
  const userId = user.id;
  return {
    id,
    startPrice,
    endPrice,
    activateForThirdUsers,
    createdAt,
    updatedAt,
    user,
    product,
    userId,
    alert
  };
}

export function generateMockProductOfInterestList({ count = 1 }):ProductOfInterest[] {
  const productsOfInterest:ProductOfInterest[] = [];

  for (let i = 0; i < count; i++) {
    productsOfInterest.push(generateMockProductOfInterest({}));
  }

  return productsOfInterest;
}