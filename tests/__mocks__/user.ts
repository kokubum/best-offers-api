import * as faker from "faker";
import { User } from "../../src/models";

export function generateMockUser({
  id = faker.datatype.uuid(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  email = faker.internet.email(),
  password = faker.internet.password(15),
  active = true,
  createdAt = faker.date.past(),
  updatedAt = new Date(),
  sharedProducts = [],
  productsOfInterest = []
}):User {
  return {
    id,
    firstName,
    lastName,
    email,
    password,
    active,
    sharedProducts,
    productsOfInterest,
    createdAt,
    updatedAt
  };
}