import { ApiClient } from "../api-client";

const materialApiClient = new ApiClient("material");

const data = [
  {
    "name": "Lona 32",
    "unitOfMeasure": "metro",
    "stock": 10,
    "quantityMaterial": 50.000,
    "widthMaterial": 3.200,
    "heightMaterial": 50.000,
    "standId": "0198afc9-4067-75b9-97a3-2c5a4cc790c0"
  }
]

const createMaterials = async () => {
  for (const item of data) {
    console.log('Creating material:', item);
    await materialApiClient.post(item);
  }

};

createMaterials();