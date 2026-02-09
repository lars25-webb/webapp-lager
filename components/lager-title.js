export default class LagerTitle extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Lager-Orders</h1>`;
  }
}
