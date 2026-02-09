import Router from './components/router.js';
import LagerTitle from './components/lager-title.js';
import ProductList from './components/product-list.js';
import SingleProduct from './components/single-product.js';
import Navigation from './components/navigation.js';
import ProductsView from './views/products-view.js';
import PacklistView from './views/packlist-view.js';

customElements.define('router-outlet', Router);
customElements.define('lager-title', LagerTitle);
customElements.define('product-list', ProductList);
customElements.define('single-product', SingleProduct);
customElements.define('navigation-outlet', Navigation);
customElements.define('products-view', ProductsView);
customElements.define('packlist-view', PacklistView);
