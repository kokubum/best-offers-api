import request from "supertest";
import { SignUpBody } from "../../src/@types/auth.types";
import app from "../../src/app";
import { Context, RequestContext } from "../../src/helpers/requestContext";
import { clearTablesContent } from "../helper";
import { generateMockSignUpBody } from "../__mocks__/auth";
import { generateMockProduct, generateMockProductList } from "../__mocks__/product";
import { generateMockProductOfInterest } from "../__mocks__/productOfInterest";

let getProductUrl: string;
let updateProductUrl:string;
let signUpUrl: string;
let activateUrl: string;
let signUpBody:SignUpBody;
let ctx: Context;

describe("Product", () => {
  beforeAll(() => {
    ctx = RequestContext.getInstance();
    getProductUrl = "/api/v1/products";
    updateProductUrl = "/api/v1/products/:id";
    signUpUrl = "/api/v1/auth/signup";
    activateUrl  = "/api/v1/auth/activate-account";
  });

  beforeEach(async () => {
    await clearTablesContent();
  });

  describe("Get Products", () => {
    it("Should get the products by the name filter", async () => {
      const searchFilter = "test"
      const product1 = generateMockProduct({name: `${searchFilter} any other words 1`});
      const product2 = generateMockProduct({name: `${searchFilter} any other words 2`});
      const productsInFilter = [product1,product2];
      const mockProducts = [...productsInFilter,...generateMockProductList({count:10})];
      await ctx.db.productRepository.save(mockProducts);

      const { status, body } = await request(app).get(getProductUrl).send({search:searchFilter});

      expect(status).toBe(200);
      expect(body.status).toBe("success");
      expect(body.data.length).toBe(productsInFilter.length);
      expect(body.data.products[0].name).toEqual(productsInFilter[0].name);
      expect(body.data.products[0].id).toEqual(productsInFilter[0].id);
      expect(body.data.products[1].name).toEqual(productsInFilter[1].name);
      expect(body.data.products[1].id).toEqual(productsInFilter[1].id);
    });

    it("Should return an empty array if no product match the filter name", async () => {
      const searchFilter = "test"
      const mockProducts = generateMockProductList({count:10});
      await ctx.db.productRepository.save(mockProducts);

      const { status, body } = await request(app).get(getProductUrl).send({search:searchFilter});

      expect(status).toBe(200);
      expect(body.status).toBe("success");
      expect(body.data.length).toBe(0);
      expect(body.data.products).toEqual([]);
    });

  });

  describe("Update Product", () => {
    beforeEach(async () => {
      signUpBody = generateMockSignUpBody({});
        await request(app).post(signUpUrl).send(generateMockSignUpBody(signUpBody));
        const activationToken = await ctx.db.tokenRepository.findOne();
  
        await request(app).get(`${activateUrl}/${activationToken?.tokenCode}`);
    });

    it("Should throw an error if the price has the wrong format",async () => {
      const product = generateMockProduct({});
      await ctx.db.productRepository.save(product);

      const { status, body } = await request(app).put(updateProductUrl.replace(":id",product.id)).send({price: "teste"});

      expect(status).toBe(400);
      expect(body.status).toBe("fail");
    });

    it("Should throw an error if the price was not sent",async () => {
      const product = generateMockProduct({});
      await ctx.db.productRepository.save(product);

      const { status, body } = await request(app).put(updateProductUrl.replace(":id",product.id)).send({});

      expect(status).toBe(400);
      expect(body.status).toBe("fail");
    });

    it("Should throw an error if the price is a decimal",async () => {
      const product = generateMockProduct({});
      await ctx.db.productRepository.save(product);

      const { status, body } = await request(app).put(updateProductUrl.replace(":id",product.id)).send({price:22.5});

      expect(status).toBe(400);
      expect(body.status).toBe("fail");
    });

    it("Should update the product and update the products of interest inside the range",async () => {
      const user = (await ctx.db.userRepository.findByEmail(signUpBody.email))!;
      const newPrice = 100;
      const product = generateMockProduct({});
      const poi1 = generateMockProductOfInterest({startPrice:50,endPrice:150,product,alert:false,user});
      const poi2 = generateMockProductOfInterest({startPrice:0,endPrice:10,product,alert:false,user});
      await ctx.db.productRepository.save(product);
      await ctx.db.productOfInterestRepository.save([poi1, poi2]);

      const { status, body } = await request(app).put(updateProductUrl.replace(":id",product.id)).send({price:newPrice});

      const dbPoi1 = await ctx.db.productOfInterestRepository.findOne({id:poi1.id});
      const dbPoi2 = await ctx.db.productOfInterestRepository.findOne({id:poi2.id});

      expect(status).toBe(200);
      expect(body.status).toBe("success");
      expect(dbPoi1!.alert).toBeTruthy();
      expect(dbPoi2!.alert).toBeFalsy();
    })

  })

})