import { createProductCard } from './product-card.js';
import { initializeShowMore } from './show-more.js';
import { updateScrollbarVisibility } from './scrollbar.js';
import { sanitizeElement } from './utils/sanitize-element.js';

let productsPromise = (async function fetchProducts() {
  try {
    const response = await fetch('src/data/products.json');
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
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  const MAX_INITIAL_PRODUCTS_MOBILE = 4;

  const products = await productsPromise;
  const productGrid = document.getElementById('product-grid');
  const productCardsWrapper = document.getElementById('product-cards-container');
  let showMoreButton = document.getElementById('show-more-button');
  let scrollbarContainer = document.getElementById('scrollbar-container');

  // Show initial products
  const initialProducts = isDesktop ? products : products.slice(0, MAX_INITIAL_PRODUCTS_MOBILE);
  const productCards = initialProducts.map(createProductCard);
  productCardsWrapper.innerHTML = productCards.join('');

  if (!isDesktop && products.length > MAX_INITIAL_PRODUCTS_MOBILE) {
    initializeShowMore(products, showMoreButton);
  } else if (isDesktop) {
    // Use requestAnimationFrame to ensure DOM is updated and measurements are accurate
    // before updating scrollbar visibility
    requestAnimationFrame(() => {
      updateScrollbarVisibility(productCardsWrapper, productGrid, scrollbarContainer);
    });
  }

  // Handle show more button and scrollbar on resize
  window.addEventListener('resize', () => {
    const isDesktopNow = window.matchMedia('(min-width: 768px)').matches;
    const currentProducts = productCardsWrapper.querySelectorAll('.product-card').length;

    if (isDesktopNow) {
      scrollbarContainer = sanitizeElement(scrollbarContainer);

      requestAnimationFrame(() => {
        updateScrollbarVisibility(productCardsWrapper, productGrid, scrollbarContainer);
      });
      showMoreButton.classList.add('hidden');
    } else if (!isDesktopNow && products.length > MAX_INITIAL_PRODUCTS_MOBILE) {
      scrollbarContainer.classList.add('md:hidden');
      scrollbarContainer.classList.remove('md:block');

      showMoreButton = sanitizeElement(showMoreButton);
      if (currentProducts < products.length) {
        initializeShowMore(products, showMoreButton);
      }
    }
  });
});
