import { ApiClient } from "../api-client";

const productApiClient = new ApiClient("product-attributes");

const data = []

const createProducts = async () => {
  for (const item of data) {
    await productApiClient.post(item);
  }
}

createProducts();