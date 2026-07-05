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

// buttons
const btnCart = document.getElementById("btnCart");
const btnBackToShop = document.getElementById("btnBackToShop");

// functions
// product functions
function createProductItem(productItem) {
  const div = document.createElement("div");
  div.classList.add(
    "w-64",
    "border",
    "border-gray-300",
    "shadow-lg",
    "p-4",
    "pb-8",
    "rounded-lg",
  );

  div.innerHTML = `
    <img src="${productItem.img}" alt="${productItem.name}" class=" w-full rounded-lg mb-4">
    <p class="cardNameproductItem font-bold">${productItem.name}</p>
    <p>Rp. ${productItem.price}</p>
    <p>Stock: ${productItem.stock}</p>
    <button class="btnPurchase mt-4 rounded-lg bg-emerald-400 hover:bg-emerald-600 text-white font-bold p-1 transition-all duration-300 w-full cursor-pointer">Purchase</button>
    `;

  // event btnPurchase
  const btnPurchase = div.querySelector(".btnPurchase");
  btnPurchase.addEventListener("click", () => {
    let productFound = false;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productItem.id === productItem.id) {
        cart[i].quantity++;
        productFound = true;
        break;
      }
    }

    if (!productFound) {
      cart.push({ productItem, quantity: 1 });
    }

    renderCart();
  });
  return div;
}

function renderProduct() {
  for (let i = 0; i < products.length; i++) {
    const productItem = products[i];
    const productElement = createProductItem(productItem);

    productArea.appendChild(productElement);
  }
}

// cart functions
function createCartItem(cartItem) {
  const div = document.createElement("div");

  div.classList.add(
    "w-64",
    "border",
    "border-gray-300",
    "shadow-lg",
    "p-4",
    "pb-8",
    "rounded-lg",
  );

  div.innerHTML = `
      <img src="${cartItem.product.img}" alt="${cartItem.product.name}" class=" w-full rounded-lg mb-4">
      <p class="cardNameProduct font-bold">${cartItem.product.name}</p>
      <p>Rp. ${cartItem.product.price}</p>
      <p>Quantity: ${cartItem.quantity}</p>
      <p>Total : ${cartItem.product.price * cartItem.quantity}</p>
  `;
  return div;
}

function renderCart() {
  cartArea.innerHTML = "";

  if (cart.length === 0) {
    cartArea.innerHTML = `
      <p class="text-green-200">Keranjang anda masih kosong.</p>
    `;
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    const cartElement = createCartItem(cartItem);

    cartArea.appendChild(cartElement);
  }
}

// event
btnCart.addEventListener("click", () => {
  productPage.classList.add("hidden");
  cartPage.classList.remove("hidden");
});

btnBackToShop.addEventListener("click", () => {
  productPage.classList.remove("hidden");
  cartPage.classList.add("hidden");
});

// render
renderProduct();
renderCart();
