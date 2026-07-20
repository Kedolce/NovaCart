import "./style.css";

// Data
const products = [
  {
    id: 1,
    name: "Keyboard Mechanical RK61",
    price: 499000,
    stock: 15,
    category: "Keyboard",
    brand: "Royal Kludge",
    rating: 4.8,
    sold: 325,
    img: "/src/assets/mechanicalkeyboard.jpg",
  },
  {
    id: 2,
    name: "Logitech G102 Lightsync",
    price: 229000,
    stock: 30,
    category: "Mouse",
    brand: "Logitech",
    rating: 4.9,
    sold: 1200,
    img: "/src/assets/g102.jpg",
  },
  {
    id: 3,
    name: "Monitor LG 24MP400",
    price: 1699000,
    stock: 8,
    category: "Monitor",
    brand: "LG",
    rating: 4.7,
    sold: 184,
    img: "/src/assets/lg24mp400.jpg",
  },
  {
    id: 4,
    name: "HyperX Cloud Stinger 2",
    price: 799000,
    stock: 12,
    category: "Headset",
    brand: "HyperX",
    rating: 4.8,
    sold: 287,
    img: "/src/assets/cloudstinger2.jpg",
  },
  {
    id: 5,
    name: "Fantech MP905 Mousepad",
    price: 89000,
    stock: 40,
    category: "Accessories",
    brand: "Fantech",
    rating: 4.6,
    sold: 640,
    img: "/src/assets/mp905.jpg",
  },
  {
    id: 6,
    name: "Kingston NV3 1TB SSD",
    price: 1099000,
    stock: 18,
    category: "Storage",
    brand: "Kingston",
    rating: 4.9,
    sold: 154,
    img: "/src/assets/nv3.jpg",
  },
  {
    id: 7,
    name: "Sandisk Ultra 64GB",
    price: 99000,
    stock: 55,
    category: "Storage",
    brand: "Sandisk",
    rating: 4.7,
    sold: 915,
    img: "/src/assets/sandisk64.jpg",
  },
  {
    id: 8,
    name: "Razer BlackShark V2 X",
    price: 699000,
    stock: 14,
    category: "Headset",
    brand: "Razer",
    rating: 4.8,
    sold: 368,
    img: "/src/assets/blacksharkv2x.jpg",
  },
  {
    id: 9,
    name: "Webcam Logitech C270",
    price: 349000,
    stock: 20,
    category: "Camera",
    brand: "Logitech",
    rating: 4.6,
    sold: 438,
    img: "/src/assets/c270.jpg",
  },
  {
    id: 10,
    name: "JETE USB Hub 4 Port",
    price: 129000,
    stock: 25,
    category: "Accessories",
    brand: "JETE",
    rating: 4.5,
    sold: 193,
    img: "/src/assets/usbhub.jpg",
  },
  {
    id: 11,
    name: "Rexus Daxa Air III",
    price: 649000,
    stock: 10,
    category: "Mouse",
    brand: "Rexus",
    rating: 4.7,
    sold: 144,
    img: "/src/assets/daxaair3.jpg",
  },
  {
    id: 12,
    name: "Keychron K2 V2",
    price: 1199000,
    stock: 9,
    category: "Keyboard",
    brand: "Keychron",
    rating: 4.9,
    sold: 228,
    img: "/src/assets/keychronk2.jpg",
  },
];
const cart = [];

// pages
const productPage = document.getElementById("productPage");
const cartPage = document.getElementById("cartPage");

// areas
const productArea = document.getElementById("productArea");
const cartArea = document.getElementById("cartArea");
const totalPrice = document.getElementById("totalPrice");

// input
const searchInput = document.getElementById("searchInput");

// buttons
const btnCart = document.getElementById("btnCart");
const btnBackToShop = document.getElementById("btnBackToShop");
const btnCheckout = document.querySelector(".btnCheckout");

// badge
const cartBadge = document.querySelector(".cartBadge");

// functions
// save function
function saveCart() {
  const cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);
}

// search function
function searchProduct(keyword) {
  const searchResult = [];

  for (let i = 0; i < products.length; i++) {
    if (products[i].name.trim().toLowerCase().includes(keyword.toLowerCase())) {
      searchResult.push(products[i]);
    }
  }
  return searchResult;
}

// filter category function
function filterCategory() {}

// restore function
function restoreCart() {
  const storageCart = localStorage.getItem("cart");
  if (storageCart === null) {
    return;
  }
  const parsedCart = JSON.parse(storageCart);
  for (let i = 0; i < parsedCart.length; i++) {
    cart.push(parsedCart[i]);
  }
}

// product functions
function createProductItem(product) {
  const div = document.createElement("div");
  div.classList.add(
    "border",
    "border-gray-300",
    "shadow-lg",
    "p-4",
    "pb-8",
    "rounded-lg",
  );

  div.innerHTML = `
    <img src="${product.img}" alt="${product.name}" class=" h-36 w-full object-cover rounded-lg mb-4">
    <p class="cardNameProduct font-bold">${product.name}</p>
    <p>Rp. ${product.price}</p>
    <p>Stock: ${product.stock}</p>
    <button class="btnPurchase mt-4 rounded-lg bg-emerald-400 hover:bg-emerald-600 text-white font-bold p-1 transition-all duration-300 w-full cursor-pointer">Purchase</button>
    `;

  // event btnPurchase
  const btnPurchase = div.querySelector(".btnPurchase");
  btnPurchase.addEventListener("click", () => {
    addToCart(product);
  });
  return div;
}

// cart functions
function createCartItem(cartItem) {
  const div = document.createElement("div");

  div.classList.add(
    "max-w-full",
    "border",
    "border-gray-300",
    "shadow-lg",
    "p-4",
    "rounded-lg",
    "cursor-pointer",
    "flex",
    "gap-4",
  );

  div.innerHTML = `
      <img src="${cartItem.product.img}" alt="${cartItem.product.name}" class="w-36 h-36 object-cover rounded-lg">
      
      <div>
      <p class="cardNameProduct font-bold">${cartItem.product.name}</p>
      <p>Rp. ${cartItem.product.price}</p>
      <p>Quantity: ${cartItem.quantity}</p>
      <p>Total : ${cartItem.product.price * cartItem.quantity}</p>

      <div class="flex gap-4 mt-2">
      <button class="cartPlusBtn bg-emerald-400 py-2 px-3 rounded-lg cursor-pointer lg:hover:bg-emerald-600 transition-colors duration-300"><img src="/src/assets/plus.png" alt="plusBtn" class="w-4"></button>

      <button class="cartMinusBtn bg-red-600 py-2 px-3 rounded-lg cursor-pointer lg:hover:bg-red-800 transition-colors duration-300"><img src="/src/assets/minus-sign.png" alt="minusBtn" class="w-4"></button>

      <button class="cartDeleteBtn bg-red-600 p-2 rounded-lg text-white flex gap-1 items-center cursor-pointer lg:hover:bg-red-800 transition-colors duration-300"><img src="/src/assets/delete.png" alt="minusBtn" class="w-4 h-4">Delete</button>
      </div>
      </div>
  `;
  // event btn cart
  const cartPlusBtn = div.querySelector(".cartPlusBtn");
  cartPlusBtn.addEventListener("click", () => {
    increaseQuantity(cartItem.product.id);
  });

  const cartMinusBtn = div.querySelector(".cartMinusBtn");
  cartMinusBtn.addEventListener("click", () => {
    decreaseQuantity(cartItem.product.id);
  });

  const cartDeleteBtn = div.querySelector(".cartDeleteBtn");
  cartDeleteBtn.addEventListener("click", () => {
    deleteItem(cartItem.product.id);
  });

  return div;
}

// render function
function renderProduct(productList) {
  productArea.innerHTML = "";

  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    const productElement = createProductItem(product);

    productArea.appendChild(productElement);
  }
}

function renderCart() {
  cartArea.innerHTML = "";

  renderCheckout();
  renderTotal();
  renderBadge();

  if (cart.length === 0) {
    cartArea.innerHTML = `
      <p class="text-gray-400 text-center col-span-full">Your cart is currently empty.</p>
    `;
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    const cartElement = createCartItem(cartItem);

    cartArea.appendChild(cartElement);
  }

  renderTotal();
}

function renderTotal() {
  const total = calculateTotal();
  totalPrice.innerText = `Rp ${total}`;
}

function renderCheckout() {
  if (cart.length === 0) {
    btnCheckout.classList.add("hidden");
  } else {
    btnCheckout.classList.remove("hidden");
  }
}

function renderBadge() {
  let totalItem = 0;

  if (cart.length === 0) {
    cartBadge.classList.add("hidden");
  } else {
    for (let i = 0; i < cart.length; i++) {
      totalItem += cart[i].quantity;
    }
    cartBadge.classList.remove("hidden");
    cartBadge.innerText = `${totalItem}`;
  }
}

// event functions
function addToCart(product) {
  let productFound = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === product.id) {
      cart[i].quantity++;
      productFound = true;
      break;
    }
  }

  if (!productFound) {
    cart.push({ product, quantity: 1 });
  }

  renderCart();
  saveCart();
}

function increaseQuantity(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (productId === cart[i].product.id) {
      cart[i].quantity++;
      break;
    }
  }
  renderCart();
  saveCart();
}

function decreaseQuantity(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (productId === cart[i].product.id) {
      if (cart[i].quantity === 1) {
        cart.splice(i, 1);
        break;
      }
      cart[i].quantity--;
      break;
    }
  }
  renderCart();
  saveCart();
}

function deleteItem(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === productId) {
      cart.splice(i, 1);
      break;
    }
  }
  renderCart();
  saveCart();
}

function calculateTotal() {
  let totalSpending = 0;

  for (let i = 0; i < cart.length; i++) {
    totalSpending += cart[i].quantity * cart[i].product.price;
  }

  return totalSpending;
}

function checkout() {
  cart.splice(0, cart.length);
  renderCart();
  saveCart();
}

// event
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim();
  console.log(keyword);

  if (keyword === "") {
    renderProduct(products);
  } else {
    const searchResult = searchProduct(keyword);
    renderProduct(searchResult);
  }
});

btnCart.addEventListener("click", () => {
  productPage.classList.add("hidden");
  cartPage.classList.remove("hidden");
});

btnBackToShop.addEventListener("click", () => {
  productPage.classList.remove("hidden");
  cartPage.classList.add("hidden");
});

btnCheckout.addEventListener("click", () => {
  checkout();
})

// render
restoreCart();
renderProduct(products);
renderCart();
