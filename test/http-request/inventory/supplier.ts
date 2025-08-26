import { ApiClient } from "../api-client";

const supplierClient = new ApiClient('suppliers');

const data = [
  {
    socialReason: "Lonas Top S.A.C.",
    ruc: "20345178999",
    contactName: "John Doe",
    phone: "959632563",
    email: "johndoe@example.com"
  },
  {
    socialReason: "Tintas Supremas S.A.C.",
    ruc: "20396312589",
    contactName: "Vladimir Putin",
    phone: "921532589",
    email: "putin@example.com"
  },
  {
    socialReason: "Papeleria Nuclear S.A.C.",
    ruc: "21596392741",
    contactName: "Khim Jong-un",
    phone: "948632520",
    email: "kim@example.com"
  },
];

const createSuppliers = async () => {
  const result = await supplierClient.post(data);
  console.log(result);
}

createSuppliers();