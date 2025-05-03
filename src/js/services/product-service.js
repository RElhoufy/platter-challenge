export async function fetchProducts() {
  // Check if products exist in session storage, leads to a 1 decrease in load time when using slow 4g connection
  const cachedProducts = sessionStorage.getItem('products');
  if (cachedProducts) {
    return JSON.parse(cachedProducts);
  }

  try {
    const response = await fetch('src/data/products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    const products = data.products;

    // Store products in session storage
    sessionStorage.setItem('products', JSON.stringify(products));

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const productsPromise = fetchProducts();
