export default class SingleProduct extends HTMLElement {
  static get observedAttributes() {
    return ['product'];
  }

  get product() {
    return JSON.parse(this.getAttribute('product'));
  }

  connectedCallback() {
    this.innerHTML = `<div>
                        <h4>${this.product.name}</h4>
                        <p>Stock: ${this.product.stock}</p>
                      </div>`;
  }
}