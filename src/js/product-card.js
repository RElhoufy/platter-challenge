import { generateStarRating } from './utils/star-rating.js';

export function createProductCard(product) {
  return `
    <div class="product-card md:min-w-[355px]">
      <!-- Image Container -->
      <div class="product-card__image relative aspect-square overflow-hidden rounded-[10px] group">
        <img 
          src="${product.mainImage}"
          alt="${product.title}"
          class="h-full w-full object-cover transition-opacity duration-300 md:group-hover:opacity-0 group-hover:opacity-100"
        />
        <img 
          src="${product.secondaryImage}"
          alt="${product.title} - Alternative view"
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 opacity-0 md:group-hover:opacity-100"
        />
        
        <div class="product-card__badge 
          absolute top-0 left-0 mt-1 md:mt-2 ml-1 md:ml-2
          flex h-[18px] md:h-[20px] w-[51px] md:w-[61px] items-center justify-center
          whitespace-nowrap rounded-full border border-black bg-white
          font-bebas text-[8px] md:text-[10px] uppercase tracking-[0.04em] md:tracking-[0.06em]">
          ${product.badge}
        </div>
        
        ${
          product.secondaryBadge
            ? `
        <div class="product-card__badge 
          absolute top-0 right-0 mt-1 md:mt-2 mr-1 md:mr-7
          flex h-[18px] md:h-[20px] w-[51px] md:w-[61px] items-center justify-center
          whitespace-nowrap rounded-full border border-black bg-[#5C7962]
          font-bebas text-[8px] md:text-[10px] uppercase tracking-[0.04em] md:tracking-[0.06em] text-white">
          ${product.secondaryBadge}
        </div>
        `
            : ''
        }
        <div></div>
      </div>

      <div class="product-card__title 
        ml-2 md:ml-3 mt-2 md:mt-4 max-w-[80%]
        font-bebas uppercase tracking-[0.03em] text-custom-black leading-[120%] md:text-[18px]">
        ${product.title}
      </div>

      <div class="product-card__reviews 
        ml-2 md:ml-3 mt-1 md:mt-2 flex items-baseline gap-1">
          <div class="product-card__reviews-rating items-center gap-1 hidden md:flex">
            ${generateStarRating(product.starRating, 10, 10)}
          </div>
          <div class="product-card__reviews-rating flex items-center gap-1 md:hidden">
            ${generateStarRating(product.starRating, 7, 7)}
          </div>
        <span class="product-card__reviews-count 
          font-poppins text-[11px] md:text-[12px] text-custom-grey">
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
