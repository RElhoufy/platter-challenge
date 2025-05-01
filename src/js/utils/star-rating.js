/**
 * Generates SVG code for a star icon
 * @param {boolean} isFilled - Whether the star should be filled
 * @param {number} width - The width of the star in pixels
 * @param {number} height - The height of the star in pixels
 * @returns {string} SVG code for the star
 */
function generateStarSVG(isFilled, width, height) {
  const fillColor = isFilled ? '#231F20' : 'none';
  const strokeColor = '#231F20';

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M4.7421 0.665844C4.58896 0.592831 4.41106 0.592831 4.25792 0.665844C4.12554 0.728962 4.05255 0.838551 4.01575 0.898671C3.97769 0.960823 3.93863 1.04 3.90056 1.11717L3.09216 2.7549L1.28389 3.0192C1.19877 3.03163 1.11143 3.04437 1.04059 3.06141C0.972051 3.07789 0.845335 3.11353 0.744493 3.21998C0.627834 3.34311 0.57297 3.51232 0.595178 3.68048C0.614375 3.82584 0.696066 3.92906 0.741891 3.98262C0.78926 4.03799 0.852504 4.09956 0.914141 4.15957L2.22206 5.43349L1.91345 7.23284C1.89888 7.31768 1.88394 7.40471 1.87818 7.47738C1.87262 7.54766 1.86724 7.67925 1.93725 7.80814C2.01824 7.95724 2.16219 8.06181 2.32902 8.09274C2.47324 8.11948 2.59672 8.07368 2.66184 8.04666C2.72917 8.01873 2.80733 7.9776 2.88351 7.93752L4.50001 7.08742L6.11652 7.93752C6.1927 7.97761 6.27085 8.01873 6.33818 8.04666C6.4033 8.07368 6.52678 8.11948 6.671 8.09274C6.83783 8.06181 6.98178 7.95724 7.06277 7.80814C7.13278 7.67925 7.1274 7.54766 7.12184 7.47738C7.11608 7.40472 7.10114 7.31769 7.08657 7.23285L6.77796 5.43349L8.08589 4.15956C8.14753 4.09955 8.21076 4.03798 8.25813 3.98262C8.30395 3.92906 8.38564 3.82584 8.40484 3.68048C8.42705 3.51232 8.37219 3.34311 8.25553 3.21998C8.15468 3.11353 8.02797 3.07789 7.95943 3.06141C7.88859 3.04437 7.80125 3.03163 7.71613 3.0192L5.90786 2.7549L5.09947 1.11719C5.0614 1.04002 5.02233 0.960828 4.98427 0.898671C4.94746 0.838551 4.87448 0.728962 4.7421 0.665844Z"
        fill="${fillColor}"
        stroke="${strokeColor}"
        stroke-width="1"
      />
    </svg>
  `;
}

/**
 * Generates HTML for a star rating display
 * @param {number} rating - The rating value (0-5)
 * @param {number} width - The width of each star in pixels (default: 7)
 * @param {number} height - The height of each star in pixels (default: 7)
 * @returns {string} HTML string containing the star rating display
 */
export function generateStarRating(rating, width, height) {
  const clampedRating = Math.min(Math.max(0, rating), 5);
  const filledStars = Math.round(clampedRating);
  const emptyStars = 5 - filledStars;

  return `
    ${Array(filledStars).fill(generateStarSVG(true, width, height)).join('')}
    ${Array(emptyStars).fill(generateStarSVG(false, width, height)).join('')}
  `;
}
