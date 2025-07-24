let cart = [];

function renderProducts(productList) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  productList.forEach(product => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>
          <span class="original-price">₹${product.originalPrice}</span>
          <span class="discounted-price">₹${product.price}</span>
          <span class="discount-percent">(${discount}% OFF)</span>
        </p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function filterProducts(category) {
  if (category === "all") {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.category === category));
  }
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `<li>${item.name} - ₹${item.price}</li>`;
  });

  // Offer logic
  let offerText = "";
  if (total > 499) {
    offerText = "🎁 Free keychain added!";
  }

  summary.innerHTML = `<strong>Total:</strong> ₹${total} ${offerText}`;
}

function orderNow() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let message = "Hello! I would like to order the following items:\n";
  cart.forEach(item => {
    message += `- ${item.name}: ₹${item.price}\n`;
  });

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `\nTotal: ₹${total}`;

  const encodedMsg = encodeURIComponent(message);
  window.open(`https://wa.me/919999999999?text=${encodedMsg}`, "_blank");
}

// Initial load
renderProducts(products);
