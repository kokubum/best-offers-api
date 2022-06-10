import * as faker from "faker";
import request from "supertest";
import { SignUpBody } from "../../src/@types/auth.types";
import { CreateProductOfInterestBody } from "../../src/@types/productOfInterest";
import app from "../../src/app";
import { Context, RequestContext } from "../../src/helpers/requestContext";
import { clearTablesContent } from "../helper";
import { generateMockSignUpBody } from "../__mocks__/auth";
import { generateMockProduct, generateMockProductList } from "../__mocks__/product";
import { generateMockProductOfInterestList } from "../__mocks__/productOfInterest";


let getProductOfInterestUrl: string;
let createProductOfInterestUrl: string;
let signUpUrl: string;
let activateUrl: string;
let signUpBody:SignUpBody;
let loginUrl: string;
let token: String;
let ctx: Context;

describe("Product Of Interest", () => {
  beforeAll(() => {
    ctx = RequestContext.getInstance();
    getProductOfInterestUrl = "/api/v1/productsOfInterest";
    createProductOfInterestUrl = "/api/v1/productsOfInterest";
    signUpUrl = "/api/v1/auth/signup";
    activateUrl  = "/api/v1/auth/activate-account";
    loginUrl = "/api/v1/auth/login";
  });

  beforeEach(async () => {
    await clearTablesContent();

    signUpBody = generateMockSignUpBody({});
      await request(app).post(signUpUrl).send(generateMockSignUpBody(signUpBody));
      const activationToken = await ctx.db.tokenRepository.findOne();

      await request(app).get(`${activateUrl}/${activationToken?.tokenCode}`);

      const { body } = await request(app)
        .post(loginUrl)
        .send({ email: signUpBody.email, password: signUpBody.password });

      token = body.data.token;
  });

  describe("Get Products Of Interest", () => {

    it("Should get the products by the name filter", async () => {
      const user = (await ctx.db.userRepository.findByEmail(signUpBody.email))!;
      const products = generateMockProductList({count:10});
      await ctx.db.productRepository.save(products);
      const productsOfInterest = generateMockProductOfInterestList({count:10}).map((poi,idx)=>{
        poi.product = products[idx];
        poi.user = user;
        return poi;
      });
      await ctx.db.productOfInterestRepository.save(productsOfInterest);

      const { status, body } = await request(app).get(getProductOfInterestUrl).set("Authorization", `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body.status).toBe("success");
      expect(body.data.length).toBe(productsOfInterest.length);
    });

  });

  describe("Create Product Of Interest", () => {
    it("Should create the product of interest",async ()=>{
      const mockProduct = generateMockProduct({});
      await ctx.db.productRepository.save(mockProduct);
      const createBody:CreateProductOfInterestBody = {
        productId:mockProduct.id,
        startPrice:100,
        endPrice:1000,
        activateForThirdUsers:false
      }

      const { status, body } = await request(app).post(createProductOfInterestUrl).send(createBody).set("Authorization", `Bearer ${token}`);

      expect(status).toBe(201);
      expect(body.status).toBe("success");
      expect(body.data.productOfInterest.startPrice).toBe(createBody.startPrice);
      expect(body.data.productOfInterest.endPrice).toBe(createBody.endPrice);
      expect(body.data.productOfInterest.activateForThirdUsers).toBe(createBody.activateForThirdUsers);
      expect(body.data.productOfInterest.product.id).toBe(mockProduct.id);
    });

    it("Should throw an error if the product doesn't exist",async ()=>{
      const createBody:CreateProductOfInterestBody = {
        productId:faker.datatype.uuid(),
        startPrice:100,
        endPrice:1000,
        activateForThirdUsers:false
      }

      const { status, body } = await request(app).post(createProductOfInterestUrl).send(createBody).set("Authorization", `Bearer ${token}`);

      expect(status).toBe(404);
      expect(body.status).toBe("fail");
    });
  });

})