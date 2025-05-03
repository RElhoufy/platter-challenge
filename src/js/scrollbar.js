function initializeScrollbar(productCardsWrapper, productGrid, scrollbarContainer) {
  const scrollbarThumb = scrollbarContainer.querySelector('#scrollbar-thumb');
  const scrollbarTrack = scrollbarContainer.querySelector('#scrollbar-track');

  if (!scrollbarThumb || !scrollbarTrack || !productCardsWrapper || !productGrid) {
    return;
  }

  let isDragging = false;
  let startX;

  // Update grid scroll based on scrollbar position
  function updateGridScroll() {
    const maxThumbPosition = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
    const totalScrollableWidth = productCardsWrapper.scrollWidth - productGrid.clientWidth;
    const thumbPositionOffsetLeft = parseFloat(scrollbarThumb.style.left) || 0;
    const scrollPercentage = (thumbPositionOffsetLeft / maxThumbPosition) * 100;

    if (scrollPercentage > 100) return;

    productCardsWrapper.style.left = `-${Math.round(
      (scrollPercentage / 100) * totalScrollableWidth
    )}px`;
  }

  // Update scrollbar thumb position based on grid scroll
  function updateScrollThumbPosition() {
    const maxThumbPosition = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
    const totalScrollableWidth = productCardsWrapper.scrollWidth - productGrid.clientWidth;
    const currentScrollPosition = Math.abs(parseFloat(productCardsWrapper.style.left) || 0);
    const scrollPercentage = (currentScrollPosition / totalScrollableWidth) * 100;

    if (scrollPercentage > 100) return;

    const thumbPosition = (scrollPercentage / 100) * maxThumbPosition;
    scrollbarThumb.style.left = `${Math.round(thumbPosition)}px`;
  }

  // Start dragging
  function handleStart(e) {
    e.preventDefault();
    isDragging = true;
    scrollbarThumb.classList.add('h-[6px]', '-mt-[2px]');

    if (e.type.includes('touch')) {
      const touch = e.touches[0];
      const rect = scrollbarThumb.getBoundingClientRect();
      startX = touch.clientX - rect.left;
    } else {
      startX = e.offsetX;
    }
  }

  // Stop dragging
  function handleEnd() {
    isDragging = false;
    scrollbarThumb.classList.remove('h-[6px]', '-mt-[2px]');
  }

  // Handle movement
  function handleMove(e) {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scrolling the page while dragging the scrollbar

    const maxThumbPosition = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
    const x = e.type.includes('touch')
      ? e.touches[0].clientX - scrollbarTrack.getBoundingClientRect().left
      : e.pageX - scrollbarTrack.getBoundingClientRect().left;

    const thumbPositionOffsetLeft = Math.max(0, Math.min(x - startX, maxThumbPosition));
    scrollbarThumb.style.left = `${thumbPositionOffsetLeft}px`;
    updateGridScroll();
  }

  // Add new event listeners
  scrollbarThumb.addEventListener('mousedown', handleStart);
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('mousemove', handleMove);
  scrollbarThumb.addEventListener('touchstart', handleStart);
  document.addEventListener('touchend', handleEnd);
  document.addEventListener('touchmove', handleMove);

  updateGridScroll();
  updateScrollThumbPosition();
}

export function updateScrollbarVisibility(productCardsWrapper, productGrid, scrollbarContainer) {
  const needsScrolling = productCardsWrapper.scrollWidth > productGrid.clientWidth;

  if (needsScrolling) {
    scrollbarContainer.classList.remove('md:hidden');
    scrollbarContainer.classList.add('md:block');
    initializeScrollbar(productCardsWrapper, productGrid, scrollbarContainer);
  } else {
    scrollbarContainer.classList.add('md:hidden');
    scrollbarContainer.classList.remove('md:block');
  }
}
