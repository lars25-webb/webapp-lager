export default class Router extends HTMLElement {
  constructor() {
    super();
    this.currentRoute = "";
    this.allRoutes = {
      "": {
        view: "<products-view></products-view>",
        name: "Lagerlista"
      },
      packlist: {
        view: "<packlist-view></packlist-view>",
        name: "Plocklista"
      }
    };
  }

  get routes() {
    return this.allRoutes;
  }

  connectedCallback() {
    window.addEventListener("hashchange", () => {
      this.resolveRoute();
    });
    this.resolveRoute();
  }

  resolveRoute() {
    this.currentRoute = location.hash.replace("#", "");
    this.render();
  }

  render() {
    this.innerHTML = this.routes[this.currentRoute]?.view || "<div>Route not found</div>";
  }
}
