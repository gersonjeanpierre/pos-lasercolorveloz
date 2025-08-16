import { ApiClient } from "../api-client";

const standClient = new ApiClient("stand");

const data = [
  {
    socialReason: "LASER VELOZ IMPORT E.I.R.L.",
    ruc: "20610129910",
    name: "Stand 194",
    address: "Jr. Huaraz 1717 - Piso 1 - Interior 194",
    phone: "995558329",
    yape: "903095920",
    bcpCta: "191-7075355-0-30",
    bcpCci: "00219100707535503053",
    email: "laser.guizado.plaza@gmail.com",
    galleryId: "0198aead-a5f0-744c-8cfb-2fc86c1537e6"
  },
  {
    socialReason: "LASER VELOZ IMPORT E.I.R.L.",
    ruc: "20610129910",
    name: "Stand 102a",
    address: "Jr. Huaraz 1717 - Piso 1 - Interior 102a",
    phone: "922951872",
    yape: "922951872", // Falta preguntar el numero de yape 
    bcpCta: "191-7075355-0-30",
    bcpCci: "00219100707535503053",
    email: "guizado102a@gmail.com",
    galleryId: "0198aead-a5f0-744c-8cfb-2fc86c1537e6"
  },
  {
    socialReason: "ASESORIAS GLOBALES EMPRESARIALES E.I.R.L.",
    ruc: "20607873411",
    name: "Stand 243",
    address: "Jr. Orbegoso 243 - Piso 1 - Interior 243",
    phone: "970899806",
    yape: "970899806",
    bcpCta: "191-2536428-0-83",
    bcpCci: "00219100253642808351",
    email: "laser.guizado.plaza@gmail.com",
    galleryId: "0198aead-a5f0-744c-8cfb-2fc86c1537e6"
  },
];

async function createStands() {
  const result = await standClient.post(data);
  console.log(result);
}

async function getStands() {
  const result = await standClient.getAll();
  console.log(result);
}

// createStands()
getStands()