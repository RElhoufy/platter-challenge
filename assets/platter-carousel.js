const isDesktop = window.matchMedia('(min-width: 768px)').matches;
const MAX_INITIAL_PRODUCTS_MOBILE = 4;

class PlatterCarousel extends HTMLElement {
  constructor() {
    super();
    this.products = Array.from(document.getElementById('platter-carousel-product-cards').children);
    this.productGrid = document.getElementById('product-grid');
    this.productCardsWrapper = document.getElementById('product-cards-container');

    this.showMoreButton = document.getElementById('show-more-button');
    this.scrollbarContainer = document.getElementById('scrollbar-container');
    this.scrollbarThumb = this.scrollbarContainer.querySelector('#scrollbar-thumb');
    this.scrollbarTrack = this.scrollbarContainer.querySelector('#scrollbar-track');

    this.init();

    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  init() {
    if (!isDesktop) {
      this.products.slice(0, MAX_INITIAL_PRODUCTS_MOBILE).forEach((product) => {
        this.productCardsWrapper.appendChild(product);
        this.initializeShowMoreButton();
      });
    } else {
      this.products.forEach((product) => {
        this.productCardsWrapper.appendChild(product);
      });
      requestAnimationFrame(() => {
        this.updateScollbarVisibility();
      });
    }
  }

  initializeShowMoreButton() {
    this.showMoreButton.classList.remove('hidden');

    this.showMoreButton.addEventListener('click', () => {
      const currentProducts = this.productCardsWrapper.querySelectorAll('.product-card').length;
      const remainingProductCards = this.products.slice(currentProducts);
      const currentHeight = this.productCardsWrapper.scrollHeight;

      // Set initial height and enable transition
      this.productCardsWrapper.style.height = `${currentHeight}px`;
      this.productCardsWrapper.style.transition = 'height 0.5s ease-in-out';
      this.productCardsWrapper.style.overflow = 'hidden';

      // Append each remaining card directly
      remainingProductCards.forEach((card) => {
        this.productCardsWrapper.appendChild(card);
      });

      // Handle cleanup after animation completes
      const handleTransitionEnd = () => {
        this.productCardsWrapper.style.height = '';
        this.productCardsWrapper.style.transition = '';
        this.productCardsWrapper.style.overflow = '';
        this.showMoreButton.classList.add('hidden');
        this.productCardsWrapper.removeEventListener('transitionend', handleTransitionEnd);
      };

      this.productCardsWrapper.addEventListener('transitionend', handleTransitionEnd);

      // Trigger the animation
      requestAnimationFrame(() => {
        this.productCardsWrapper.style.height = `${this.productCardsWrapper.scrollHeight}px`;
      });
    });
  }

  updateScollbarVisibility() {
    const needsScrolling = this.productCardsWrapper.scrollWidth > this.productGrid.clientWidth;
    if (needsScrolling) {
      this.scrollbarContainer.classList.remove('md:hidden');
      this.scrollbarContainer.classList.add('md:block');
      this.initializeScrollbar();
    } else {
      this.scrollbarContainer.classList.add('md:hidden');
      this.scrollbarContainer.classList.remove('md:block');
    }
  }

  initializeScrollbar() {
    let isDragging = false;
    let startX;

    // Update grid scroll based on scrollbar position
    const updateGridScroll = () => {
      const maxThumbPosition = this.scrollbarTrack.clientWidth - this.scrollbarThumb.clientWidth;
      const totalScrollableWidth = this.productCardsWrapper.scrollWidth - this.productGrid.clientWidth;
      const thumbPositionOffsetLeft = parseFloat(this.scrollbarThumb.style.left) || 0;
      const scrollPercentage = (thumbPositionOffsetLeft / maxThumbPosition) * 100;

      if (scrollPercentage > 100) return;

      this.productCardsWrapper.style.left = `-${Math.round((scrollPercentage / 100) * totalScrollableWidth)}px`;
    };

    // Update scrollbar thumb position based on grid scroll
    const updateScrollThumbPosition = () => {
      const maxThumbPosition = this.scrollbarTrack.clientWidth - this.scrollbarThumb.clientWidth;
      const totalScrollableWidth = this.productCardsWrapper.scrollWidth - this.productGrid.clientWidth;
      const currentScrollPosition = Math.abs(parseFloat(this.productCardsWrapper.style.left) || 0);
      const scrollPercentage = (currentScrollPosition / totalScrollableWidth) * 100;

      if (scrollPercentage > 100) return;

      const thumbPosition = (scrollPercentage / 100) * maxThumbPosition;
      this.scrollbarThumb.style.left = `${Math.round(thumbPosition)}px`;
    };

    // Start dragging
    const handleStart = (e) => {
      e.preventDefault();
      isDragging = true;
      this.scrollbarThumb.classList.add('h-1.5', '-mt-0.5');

      if (e.type.includes('touch')) {
        const touch = e.touches[0];
        const rect = this.scrollbarThumb.getBoundingClientRect();
        startX = touch.clientX - rect.left;
      } else {
        startX = e.offsetX;
      }
    };

    // Stop dragging
    const handleEnd = () => {
      isDragging = false;
      this.scrollbarThumb.classList.remove('h-1.5', '-mt-0.5');
    };

    // Handle movement
    const handleMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scrolling the page while dragging the scrollbar

      const maxThumbPosition = this.scrollbarTrack.clientWidth - this.scrollbarThumb.clientWidth;
      const x = e.type.includes('touch')
        ? e.touches[0].clientX - this.scrollbarTrack.getBoundingClientRect().left
        : e.pageX - this.scrollbarTrack.getBoundingClientRect().left;

      const thumbPositionOffsetLeft = Math.max(0, Math.min(x - startX, maxThumbPosition));
      this.scrollbarThumb.style.left = `${thumbPositionOffsetLeft}px`;
      updateGridScroll();
    };

    // Add new event listeners
    this.scrollbarThumb.addEventListener('mousedown', handleStart);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('mousemove', handleMove);
    this.scrollbarThumb.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchmove', handleMove);

    updateGridScroll();
    updateScrollThumbPosition();
  }

  handleResize() {
    const isDesktopNow = window.matchMedia('(min-width: 768px)').matches;
    const currentProducts = this.productCardsWrapper.querySelectorAll('.product-card').length;

    if (isDesktopNow) {
      // Sanitize and get fresh references
      this.scrollbarContainer = this.sanitizeElement(this.scrollbarContainer);
      this.scrollbarThumb = this.scrollbarContainer.querySelector('#scrollbar-thumb');
      this.scrollbarTrack = this.scrollbarContainer.querySelector('#scrollbar-track');

      requestAnimationFrame(() => {
        this.updateScollbarVisibility();
      });
      this.showMoreButton.classList.add('hidden');
    } else if (!isDesktopNow && currentProducts > MAX_INITIAL_PRODUCTS_MOBILE) {
      this.scrollbarContainer.classList.add('md:hidden');
      this.scrollbarContainer.classList.remove('md:block');

      // Sanitize and get fresh reference for show more button
      this.showMoreButton = this.sanitizeElement(this.showMoreButton);
      this.showMoreButton = document.getElementById('show-more-button');

      if (currentProducts < this.products.length) {
        this.initializeShowMoreButton();
      }
    }
  }

  sanitizeElement(element) {
    if (!element || !element.parentNode) return element;
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
  }
}

customElements.define('platter-carousel', PlatterCarousel);
