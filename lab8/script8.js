  // ===============================
// BASE PRODUCT CLASS
// ===============================
class Product {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }

  getInfo() {
    return `${this.name} - $${this.price}`;
  }
}

// ===============================
// CHILD CLASS (INHERITANCE)
// ===============================
class ElectronicProduct extends Product {
  constructor(name, price, image, warranty) {
    super(name, price, image);
    this.warranty = warranty;
  }

  getInfo() {
    return `${super.getInfo()} | Warranty: ${this.warranty} years`;
  }
}

// ===============================
// PRODUCT INSTANCES
// ===============================
const products = [
  new Product("Wooden Chair", 120, "images/wooden chair.jpeg", ),
  new ElectronicProduct("Tube Light", 99, "images/light.jpeg", 2),
  new ElectronicProduct("Amazon Battery", 999, "images/Battery.jpeg", 1),
  new Product(" Galaxy Tablet", 45, "images/galaxy tablet.jpeg")
];

// ===============================
// DISPLAY PRODUCTS IN DOM
// ===============================
const container = document.getElementById("product-container");

products.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p class="price">$${p.price}</p>
    <p>${p.getInfo()}</p>
  `;

  container.appendChild(card);
});

// ===============================
// THEME TOGGLE
// ===============================
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}