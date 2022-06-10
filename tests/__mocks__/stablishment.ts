import * as faker from "faker";
import { Stablishment } from "../../src/models";

export function generateMockStablishment({
  id = faker.datatype.uuid(),
  name = faker.name.firstName(),
  createdAt = faker.date.past(),
  updatedAt = new Date(),
  products = []
}):Stablishment {
  return {
    id,
    name,
    products,
    createdAt,
    updatedAt,
  };
}

export function generateMockStablishmentList({ count = 1 }):Stablishment[] {
  const products:Stablishment[] = [];

  for (let i = 0; i < count; i++) {
    products.push(generateMockStablishment({}));
  }

  return products;
}