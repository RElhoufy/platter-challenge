/**
 * Sanitizes an element by cloning it and replacing the original to remove all event listeners.
 * @param {HTMLElement} element - The element to sanitize
 * @returns {HTMLElement} - The new sanitized element
 */
export function sanitizeElement(element) {
  if (!element || !element.parentNode) return element;

  const newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
  return newElement;
}
