const data = {
  name: "Ojales",
  baseCost: 0.50,
  price: 1
};

fetch("http://localhost:3000/api/v1/product-addons", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);