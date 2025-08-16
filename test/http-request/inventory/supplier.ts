const data = {
  // id: '0198aa77-cf01-7169-8b5c-148618f5499b',
  socialReason: "Lonas Top S.A.C.",
  ruc: "12345178999",
  contactName: "John Doe",
  phone: "959632563"
};

fetch("http://localhost:3000/api/v1/suppliers", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);