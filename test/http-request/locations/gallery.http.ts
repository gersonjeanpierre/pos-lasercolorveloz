import { ApiClient } from "../api-client";

const galleryClient = new ApiClient('gallery')

const data = [
  {
    name: 'CC Guizado Record Plaza',
    address: 'Jr. Huaraz 1717 (Altura Cdra. 9 Av. Brasil)'
  },
  {
    name: 'CC Molicentro',
    address: 'Av. Tacna 1567'
  }
]

async function createGalleries() {
  const result = await galleryClient.post(data);
  console.log(result);
}

async function getAllGalleries() {
  const result = await galleryClient.getAll();
  console.log(result);
  console.log(result[0].stands);
}

// createGalleries();
getAllGalleries();