import { apiKey, baseURL } from "../utils.js";

export default class PacklistView extends HTMLElement {
  constructor() {
    super();
    this.orders = [];
  }

  async connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <lager-title></lager-title>
      </header>
      <main class="main">
        <h2>Packed Orders</h2>
        <div id="packlist-container">Loading...</div>
      </main>
    `;
    await this.fetchPackedOrders();
    this.render();
  }

  async fetchPackedOrders() {
    try {
      const response = await fetch(`${baseURL}/orders?status=Packad&api_key=${apiKey}`);
      const result = await response.json();
      this.orders = result.data;
    } catch (error) {
      console.error('Failed to fetch packed orders:', error);
      this.querySelector('#packlist-container').innerHTML = '<p>Error loading packed orders.</p>';
    }
  }

  render() {
    const container = this.querySelector('#packlist-container');
    if (this.orders.length === 0) {
      container.innerHTML = '<p>No packed orders found.</p>';
      return;
    }
    const list = this.orders.map((order) => {
      return `
        <div class="order">
          <h3>Order #${order.id}</h3>
          <p>Status: ${order.status}</p>
          <div class="products">
            ${order.products.map(product => `
              <div class="product">
                <h4>${product.name}</h4>
                <p>Quantity Packed: ${product.quantity}</p>
                <p>Remaining Stock: ${product.stock}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
    container.innerHTML = list;
  }
}
