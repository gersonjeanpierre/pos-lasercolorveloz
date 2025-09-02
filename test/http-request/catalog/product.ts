import { ProductType } from "../../../src/common/enums/catalog/products/product-type.enum";
import { ApiClient } from "../api-client";

const ProductApiClient = new ApiClient("products");

const data = [
  {
    name: "Banner",
    type: `${ProductType.Gigantografia}`,
    price: 10,
    baseCost: 6
  }
]

const createProducts = async () => {
  const result = await ProductApiClient.post(data);
  console.log(result);
}

createProducts();
