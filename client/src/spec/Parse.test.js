//TEST BASE AXIOS FUNCTIONALITY HERE
//DON'T ACTUALLY CONNECT TO THE API. USE MOCK TO CREATE PRE-DETERMINED RESULTS.

//THESE TESTS DON'T SEEM TO ACTUALLY BE TOO IMPORTANT BECAUSE OUR "parse.js" AXIOS CALLS AREN'T DOING ANYTHING TO THE DATA
//  ALL MODIFICATIONS ARE WITHIN THE COMPONENTS
//  THIS IS MORE OF A "JUST IN CASE" SORT OF THING

import Parse from '../parse.js';
import { productList, product } from './testData.js';
import mockAxios from 'axios';

jest.mock("axios");
// mockAxios.get.mockResolvedValue(testData.productList);

describe("Axios GET requests", () => {
  afterEach(jest.clearAllMocks);

  test("should retrieve a list of products", async () => {
    mockAxios.get.mockResolvedValue(productList);
    const result = await Parse.getAll('products/')
    expect(result.data.length).toBe(3);
    expect(result.data[0].id).toBe(1);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  })

  test("should retrieve a single product", async () => {
    mockAxios.get.mockResolvedValue(product);
    const result = await Parse.getAll('products/11')
    expect(result.data.id).toBe(11);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  })

});