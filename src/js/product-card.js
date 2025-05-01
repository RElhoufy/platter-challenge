import { generateStarRating } from './utils/star-rating.js';

export function createProductCard(product) {
  return `
    <div class="product-card">
      <!-- Image Container -->
      <div class="product-card__image relative aspect-square overflow-hidden rounded-[10px]">
        <img src="${product.mainImage}" alt="${product.title}" class="h-full w-full object-cover" />
        
        <div class="product-card__badge 
          absolute top-0 left-0 mt-1 ml-1
          flex h-[18px] w-[51px] items-center justify-center
          whitespace-nowrap rounded-full border border-black bg-white
          font-bebas text-[8px] uppercase tracking-[0.04em]">
          ${product.badge}
        </div>
        
        ${
          product.secondaryBadge
            ? `
        <div class="product-card__badge 
          absolute top-0 right-0 mt-1 mr-1
          flex h-[18px] w-[51px] items-center justify-center
          whitespace-nowrap rounded-full border border-black bg-[#5C7962]
          font-bebas text-[8px] uppercase tracking-[0.04em] text-white">
          ${product.secondaryBadge}
        </div>
        `
            : ''
        }
        <div></div>
      </div>

      <div class="product-card__title 
        ml-2 mt-2 max-w-[80%]
        font-bebas uppercase tracking-[0.03em] text-custom-black leading-[120%]">
        ${product.title}
      </div>

      <div class="product-card__reviews 
        ml-2 mt-1 flex items-baseline gap-1">
        <div class="product-card__reviews-rating flex items-center gap-1">
          ${generateStarRating(product.starRating, 8, 8)}
        </div>
        <span class="product-card__reviews-count 
          font-poppins text-[11px] text-custom-grey">
          ${product.numberOfReviews} Reviews
        </span>
      </div>

      <div class="product-card__price 
        ml-2 mt-2
        font-poppins font-medium text-custom-black">
        $${product.price}
      </div>
    </div>
  `;
}
