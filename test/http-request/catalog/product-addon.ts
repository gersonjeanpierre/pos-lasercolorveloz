import { ApiClient } from "../api-client";

const productAddonApiClient = new ApiClient("product-addons");

const data = [
  {
    name: "Termosellado",
    price: 2
  },
  {
    name: "Tubo y colgante",
    price: 5
  },
  {
    name: "Ojales",
    price: 1
  },
  {
    name: "Bastidores",
    price: 2.5
  }
];

const createProductAddons = async () => {
  const result = await productAddonApiClient.post(data);
  console.log(result);
}

createProductAddons();
