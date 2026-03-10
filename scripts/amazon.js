import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid(productsList = products)  {
  let productsHTML = '';

  productsList.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

       <div class="added-to-cart js-added-message-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
      </div>
    `;
  });

  // ✅ Show message if no products found
  if (productsHTML === '') {
    document.querySelector('.js-products-grid').innerHTML =
      `<p style="font-size:20px;text-align:center;margin-top:40px;">
        No products found
      </p>`;
  } else {
    document.querySelector('.js-products-grid').innerHTML = productsHTML;
  }

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {

      const productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();

      const addedMessage = document.querySelector(`.js-added-message-${productId}`);

      addedMessage.classList.add('added-visible');

      setTimeout(() => {
        addedMessage.classList.remove('added-visible');
      }, 2000);

    });
  });
}

// 🔎 SEARCH BUTTON
document.querySelector('.js-search-button')
  .addEventListener('click', () => {

    const searchText = document
      .querySelector('.js-search-bar')
      .value
      .toLowerCase();

    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchText);
    });

    renderProductsGrid(filteredProducts);
  });

//  ENTER KEY SEARCH
document.querySelector('.js-search-bar')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.querySelector('.js-search-button').click();
    }
  });

// CLEAR SEARCH
document.querySelector('.js-clear-search')
  .addEventListener('click', () => {

    document.querySelector('.js-search-bar').value = '';

    renderProductsGrid(products);
  });

document.querySelectorAll('.js-filter')
  .forEach((button) => {

    button.addEventListener('click', () => {

      const category = button.dataset.category;

      if (category === 'all') {
        renderProductsGrid(products);
        return;
      }

      let filteredProducts = [];

      if (category === 'clothing') {
        filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes('shirt') ||
          product.name.toLowerCase().includes('jacket') ||
          product.name.toLowerCase().includes('beachwear') ||
          product.name.toLowerCase().includes('chino') ||
          product.name.toLowerCase().includes('shorts') ||
          product.name.toLowerCase().includes('sweatpant') ||
          product.name.toLowerCase().includes('hoodie')

        );
      }

      if (category === 'kitchen') {
        filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes('coffee') ||
          product.name.toLowerCase().includes('container') ||
          product.name.toLowerCase().includes('kettle') ||
          product.name.toLowerCase().includes('blender') ||
          product.name.toLowerCase().includes('utensils') ||
          product.name.toLowerCase().includes('bakeware ') ||
          product.name.toLowerCase().includes('lids') ||
          product.name.toLowerCase().includes('plate') ||
          product.name.toLowerCase().includes('paper') ||
          product.name.toLowerCase().includes('toaster')
        );
      }

      renderProductsGrid(filteredProducts);

    });

  });