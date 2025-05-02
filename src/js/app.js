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
  const productGrid = document.getElementById('product-grid');
  const productCardsWrapper = document.getElementById('product-cards-container');
  const showMoreButton = document.getElementById('show-more-button');
  const scrollbarContainer = document.getElementById('scrollbar-container');
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;

  // Show initial products
  const initialProducts = isDesktop ? products : products.slice(0, 4);
  const productCards = initialProducts.map(createProductCard);
  productCardsWrapper.innerHTML = productCards.join('');

  // Show button if there are more products and we're on mobile
  if (!isDesktop && products.length > 4) {
    showMoreButton.classList.remove('hidden');
  } else if (isDesktop && products.length > 4) {
    scrollbarContainer.classList.remove('md:hidden');
    scrollbarContainer.classList.add('md:block');
  }

  // Scrollbar functionality
  if (isDesktop) {
    const scrollbarThumb = document.getElementById('scrollbar-thumb');
    const scrollbarTrack = document.getElementById('scrollbar-track');
    let isDragging = false;
    let startX;
    let startScrollLeft;

    // Update grid scroll based on scrollbar position
    function updateGridScroll() {
      const maxThumbPosition = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
      const totalScrollableWidth = productCardsWrapper.scrollWidth - productGrid.clientWidth;
      const thumbPositionOffsetLeft = parseFloat(scrollbarThumb.style.left) || 0;
      const scrollPercentage = (thumbPositionOffsetLeft / maxThumbPosition) * 100;

      if (scrollPercentage >= 100) return;
      productCardsWrapper.style.left = `-${Math.round(
        (scrollPercentage / 100) * totalScrollableWidth
      )}px`;
    }

    // Detect when user presses down on the scrollbar thumb
    scrollbarThumb.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.offsetX; // X coordinate of the mouse relative to the scrollbar thumb
      startScrollLeft = parseFloat(productCardsWrapper.style.left) || 0; // How far the grid is scrolled from the left edge of the container
    });

    // Detect when user releases their press on the mouse
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Mouse move event for scrollbar thumb
    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const maxThumbPosition = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
      const x = e.pageX - scrollbarTrack.getBoundingClientRect().left; // Final position of the mouse relative to the left edge of the scrollbar track
      const thumbPositionOffsetLeft = Math.max(0, Math.min(x - startX, maxThumbPosition));
      scrollbarThumb.style.left = `${thumbPositionOffsetLeft}px`;
      updateGridScroll();
    });
  }

  // Add click event listener for show more button
  showMoreButton.addEventListener('click', () => {
    const currentProducts = productCardsWrapper.querySelectorAll('.product-card').length;
    const remainingProducts = products.slice(currentProducts);
    const remainingProductCards = remainingProducts.map(createProductCard);

    // Store the current height
    const currentHeight = productCardsWrapper.scrollHeight;

    // Add the new cards
    productCardsWrapper.innerHTML += remainingProductCards.join('');

    // Set initial height and enable transition
    productCardsWrapper.style.height = `${currentHeight}px`;
    productCardsWrapper.style.transition = 'height 0.5s ease-in-out';
    productCardsWrapper.style.overflow = 'hidden';

    // Handle cleanup after animation completes
    const handleTransitionEnd = () => {
      productCardsWrapper.style.height = '';
      productCardsWrapper.style.transition = '';
      productCardsWrapper.style.overflow = '';
      showMoreButton.classList.add('hidden');
      productCardsWrapper.removeEventListener('transitionend', handleTransitionEnd);
    };

    productCardsWrapper.addEventListener('transitionend', handleTransitionEnd);

    // Trigger the animation
    requestAnimationFrame(() => {
      productCardsWrapper.style.height = `${productCardsWrapper.scrollHeight}px`;
    });
  });
});
