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

    const thumbPosition = (scrollPercentage / 100) * maxThumbPosition;
    scrollbarThumb.style.left = `${Math.round(thumbPosition)}px`;
  }

  // User presses finger down on mouse click
  function handleMouseDown(e) {
    console.log('handleMouseDown');
    isDragging = true;
    scrollbarThumb.classList.add('h-[6px]', '-mt-[2px]');
    startX = e.offsetX; // X position of mouse from edge of scrollbar thumb
  }

  // User releases finger from mouse click
  function handleMouseUp() {
    isDragging = false;
    scrollbarThumb.classList.remove('h-[6px]', '-mt-[2px]');
  }

  // User is dragging mouse
  function handleMouseMove(e) {
    if (!isDragging) return;
    const maxThumbPosition = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
    const x = e.pageX - scrollbarTrack.getBoundingClientRect().left; // How much the mouse has travelled starting from the left edge of the scrollbar
    const thumbPositionOffsetLeft = Math.max(0, Math.min(x - startX, maxThumbPosition));
    scrollbarThumb.style.left = `${thumbPositionOffsetLeft}px`;
    updateGridScroll();
  }

  // Remove any existing event listeners
  scrollbarThumb.removeEventListener('mousedown', handleMouseDown);
  document.removeEventListener('mouseup', handleMouseUp);
  document.removeEventListener('mousemove', handleMouseMove);

  // Add new event listeners
  scrollbarThumb.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('mousemove', handleMouseMove);

  updateScrollThumbPosition();
  updateGridScroll();
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
