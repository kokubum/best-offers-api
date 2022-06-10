import request from "supertest";
import app from "../../src/app";
import { Context, RequestContext } from "../../src/helpers/requestContext";
import { clearTablesContent } from "../helper";
import { generateMockProduct, generateMockProductList } from "../__mocks__/product";


let getProductUrl: string;
let ctx: Context;

describe("Product", () => {
  beforeAll(() => {
    ctx = RequestContext.getInstance();
    getProductUrl = "/api/v1/products";
  });

  describe("Get Products", () => {
    beforeEach(async () => {
      await clearTablesContent();
    });

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

})