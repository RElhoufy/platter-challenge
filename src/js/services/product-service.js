export async function fetchProducts() {
  try {
    const response = await fetch('src/data/products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const productsPromise = fetchProducts();
