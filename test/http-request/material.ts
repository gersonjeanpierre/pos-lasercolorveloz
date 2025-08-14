const data = {
  name: "Lona 32",
  unitOfMeasure: "metro",
  stock: 10,
  quantityMaterial: 50,
  widthMaterial: 3.2,
  heightMaterial: 50
};

fetch("http://localhost:3000/api/v1/material", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);