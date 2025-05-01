import { createProductCard } from './product-card.js';

let productsPromise = (async function fetchProducts() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
})();

document.addEventListener('DOMContentLoaded', async function () {
  const products = await productsPromise;
  const productGridContainer = document.getElementById('product-cards-container');
  const showMoreButton = document.getElementById('show-more-button');

  // Show initial products
  const initialProducts = products.slice(0, 4);
  const productCards = initialProducts.map(createProductCard);
  productGridContainer.innerHTML = productCards.join('');

  // Show button if there are more products
  if (products.length > 4) {
    showMoreButton.classList.remove('hidden');
  }

  // Add click event listener
  showMoreButton.addEventListener('click', () => {
    const currentProducts = productGridContainer.querySelectorAll('.product-card').length;
    const remainingProducts = products.slice(currentProducts);
    const remainingProductCards = remainingProducts.map(createProductCard);
    productGridContainer.innerHTML += remainingProductCards.join('');
    showMoreButton.classList.add('hidden');
  });
});
