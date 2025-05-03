import { createProductCard } from './product-card.js';

export function initializeShowMore(products, showMoreButton) {
  if (!showMoreButton) return;

  showMoreButton.classList.remove('hidden');

  showMoreButton.addEventListener('click', () => {
    const productCardsWrapper = document.getElementById('product-cards-container');
    const currentProducts = productCardsWrapper.querySelectorAll('.product-card').length;
    const remainingProducts = products.slice(currentProducts);
    const remainingProductCards = remainingProducts.map(createProductCard);
    const currentHeight = productCardsWrapper.scrollHeight;

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
}
