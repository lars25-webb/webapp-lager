import { apiKey, baseURL } from "../utils.js";

export default class ProductList extends HTMLElement {
  constructor() {
    super();
    this.orders = [];
  }

  async connectedCallback() {
    this.innerHTML = '<p>Loading orders...</p>';
    try {
      const response = await fetch(`${baseURL}/orders?status=ny&api_key=${apiKey}`);
      const result = await response.json();
      this.orders = result.data;
      this.render();
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      this.innerHTML = '<p>Error loading orders.</p>';
    }
  }

  render() {
    const list = this.orders.map((order) => {
      return `
        <div class="order">
          <h3>Order #${order.id}</h3>
          <p>Status: ${order.status}</p>
          <div class="products">
            ${order.products.map(product => {
              return `
                <div class="product">
                  <h4>${product.name}</h4>
                  <p>Quantity to Pick: ${product.quantity}</p>
                  <p>Stock Available: ${product.stock}</p>
                  <button class="button red-button" data-order-id="${order.id}" data-product-id="${product.id}" aria-label="Pack ${product.name}">Pack</button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
    this.innerHTML = `<h2>Orders to Pack</h2>${list}`;

    // Event delegation for pack buttons
    this.addEventListener('click', (e) => {
      if (e.target.classList.contains('red-button')) {
        const orderId = parseInt(e.target.dataset.orderId);
        const productId = parseInt(e.target.dataset.productId);
        this.packOrder(orderId, productId);
      }
    });
  }

  async packOrder(orderId, productId) {
    try {
      const order = this.orders.find(o => o.id === orderId);
      const product = order.products.find(p => p.id === productId);

      if (product.stock < product.quantity) {
        alert(`Not enough stock for ${product.name}`);
        return;
      }

      // Update stock
      await fetch(`${baseURL}/products/${productId}?api_key=${apiKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock: product.stock - product.quantity
        })
      });

      // Update order status
      await fetch(`${baseURL}/orders/${orderId}?api_key=${apiKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Packad' })
      });

      alert('Order packed and stock updated!');
      // Re-fetch and re-render
      await this.connectedCallback();
    } catch (error) {
      console.error('Packing failed:', error);
      alert('An error occurred while packing.');
    }
  }
}

