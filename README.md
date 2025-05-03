# Platter Challenge

To view the end result please visit the following URL https://relhoufy.github.io/platter-challenge/

# Products Data

The product data can be found in `src/data/products.json`.

Each product has the following properties:

- `id`: Unique identifier (number)
- `title`: Product name
- `price`: Product price (number)
- `mainImage`: Primary product image path
- `secondaryImage`: Secondary product image path
- `numberOfReviews`: Total number of reviews (number)
- `starRating`: Product rating (number, 0-5)
- `badge`: Primary badge text
- `secondaryBadge`: Optional promotional badge text

## Misc information

---

##### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

##### Development Dependencies

- `live-server` (^1.2.2): A simple development server with live reload capability
  - Used for local development
  - Automatically reloads the page when files change
  - Started with `npm run dev`
