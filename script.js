let cart = [];

function filterProducts(category) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  filtered.forEach(p => {
    const discount = Math.round(((p.original - p.price) / p.original) * 100);
    const el = document.createElement("div");
    el.className = "product-card";
    el.innerHTML = `
      <img src="\${p.image}" alt="\${p.name}">
      <h3>\${p.name}</h3>
      <p><span class="original-price">₹\${p.original}</span> <span class="discounted-price">₹\${p.price}</span></p>
      <p class="discount-tag">Save \${discount}%</p>
      <button onclick='addToCart("\${p.name}", \${p.price})'>Add to Cart</button>
    `;
    list.appendChild(el);
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  displayCart();
}

function displayCart() {
  const items = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  items.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `\${item.name} - ₹\${item.price}`;
    items.appendChild(li);
  });

  let offer = "";
  if (total > 499) {
    offer = "🎁 Offer Applied: Free keychain!";
  }

  summary.innerHTML = `
    <p><strong>Total:</strong> ₹\${total}</p>
    <p>\${offer}</p>
    <a href="https://wa.me/919999999999?text=I want to order items worth ₹\${total}">Order on WhatsApp</a>
  `;
}

window.onload = () => filterProducts("all");
