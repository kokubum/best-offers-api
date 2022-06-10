import * as faker from "faker";
import request from "supertest";
import { SignUpBody } from "../../src/@types/auth.types";
import { CreateSharedProductBody } from "../../src/@types/sharedProduct.type";
import app from "../../src/app";
import { Context, RequestContext } from "../../src/helpers/requestContext";
import { clearTablesContent } from "../helper";
import { generateMockSignUpBody } from "../__mocks__/auth";
import { generateMockProduct, generateMockProductList } from "../__mocks__/product";
import { generateMockSharedProduct, generateMockSharedProductList } from "../__mocks__/sharedProduct";
import { generateMockStablishment } from "../__mocks__/stablishment";



let getSharedProductUrl: string;
let createSharedProductUrl: string;
let deleteSharedProductUrl:string;
let signUpUrl: string;
let activateUrl: string;
let signUpBody:SignUpBody;
let loginUrl: string;
let token: String;
let ctx: Context;

describe("Shared Product", () => {
  beforeAll(() => {
    ctx = RequestContext.getInstance();
    getSharedProductUrl = "/api/v1/sharedProducts";
    createSharedProductUrl = "/api/v1/sharedProducts";
    signUpUrl = "/api/v1/auth/signup";
    activateUrl  = "/api/v1/auth/activate-account";
    loginUrl = "/api/v1/auth/login";
    deleteSharedProductUrl = "/api/v1/sharedProducts/:id"
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

  describe("Get Shared Products", () => {

    it("Should get the products by the name filter", async () => {
      const user = (await ctx.db.userRepository.findByEmail(signUpBody.email))!;
      const products = generateMockProductList({count:10});
      await ctx.db.productRepository.save(products);
      const sharedProducts = generateMockSharedProductList({count:10}).map((sp,idx)=>{
        sp.product = products[idx];
        sp.user = user;
        return sp;
      });
      await ctx.db.sharedProductRepository.save(sharedProducts);

      const { status, body } = await request(app).get(getSharedProductUrl).set("Authorization", `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body.status).toBe("success");
      expect(body.data.length).toBe(sharedProducts.length);
    });

  });

  describe("Create Shared Product", () => {
    it("Should create the shared product with a product with no stablishment name",async ()=>{
      const createBody:CreateSharedProductBody = {
        name:"shared product",
        price:1000,
        stablishmentName:"Name",
      }

      const { status, body } = await request(app).post(createSharedProductUrl).send(createBody).set("Authorization", `Bearer ${token}`);

      expect(status).toBe(201);
      expect(body.status).toBe("success");
      expect(body.data.sharedProduct.stablishmentName).toBe(createBody.stablishmentName);
      expect(body.data.sharedProduct.product.price).toBe(createBody.price);
      expect(body.data.sharedProduct.product.name).toBe(createBody.name);
      expect(body.data.sharedProduct.product.stablishment).toBeUndefined();

    });

    it("Should create the shared product with a product and an existing stablishment entity",async ()=>{
      const mockStablishment = generateMockStablishment({});
      await ctx.db.stablishmentRepository.save(mockStablishment);
      const createBody:CreateSharedProductBody = {
        name:"shared product",
        price:1000,
        stablishmentName:mockStablishment.name,
      }

      const { status, body } = await request(app).post(createSharedProductUrl).send(createBody).set("Authorization", `Bearer ${token}`);

      expect(status).toBe(201);
      expect(body.status).toBe("success");
      expect(body.data.sharedProduct.stablishmentName).toBe(createBody.stablishmentName);
      expect(body.data.sharedProduct.product.price).toBe(createBody.price);
      expect(body.data.sharedProduct.product.name).toBe(createBody.name);
      expect(body.data.sharedProduct.product.stablishment.id).toBe(mockStablishment.id);
      expect(body.data.sharedProduct.product.stablishment.name).toBe(createBody.stablishmentName);


    });

   
  });

  describe("Delete Shared Product", () => {
    it("Should delete an existing Shared Product", async ()=>{
      const user = (await ctx.db.userRepository.findByEmail(signUpBody.email))!;
      const product = generateMockProduct({})
      await ctx.db.productRepository.save(product);
      const sharedProduct = generateMockSharedProduct({product,user});
      await ctx.db.sharedProductRepository.save(sharedProduct);
      
      const { status, body } = await request(app).delete(deleteSharedProductUrl.replace(":id",sharedProduct.id)).set("Authorization", `Bearer ${token}`);

      const sharedProducts = await ctx.db.sharedProductRepository.find();

      expect(status).toBe(200);
      expect(body.status).toBe("success");
      expect(sharedProducts.length).toBe(0)
    });

    it("Should return success if there is no shared product with the passed id", async ()=>{
      const { status, body } = await request(app).delete(deleteSharedProductUrl.replace(":id",faker.datatype.uuid())).set("Authorization", `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body.status).toBe("success");
    });
  })

})