/**
 * cart.js
 * Implements custom elements for the cart drawer.
 */

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', class CartDrawer extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
      this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
      this.setHeaderCartIconAccessibility();
    }

    setHeaderCartIconAccessibility() {
      const cartLink = document.querySelector('#cart-icon-bubble');
      if (!cartLink) return;
      cartLink.setAttribute('role', 'button');
      cartLink.setAttribute('aria-haspopup', 'dialog');
      cartLink.addEventListener('click', (event) => {
        event.preventDefault();
        this.open(cartLink);
      });
      cartLink.addEventListener('keydown', (event) => {
        if (event.code.toUpperCase() === 'SPACE') {
          event.preventDefault();
          this.open(cartLink);
        }
      });
    }

    open(triggeredBy) {
      if (triggeredBy) this.setActiveElement(triggeredBy);
      this.classList.add('active');
      this.addEventListener('transitionend', () => {
        const focusElement = this.querySelector('.drawer__close');
        if (focusElement) focusElement.focus();
      }, { once: true });

      document.body.classList.add('overflow-hidden');
    }

    close() {
      this.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    }

    setActiveElement(element) {
      this.activeElement = element;
    }
  });
}

if (!customElements.get('cart-drawer-items')) {
  customElements.define('cart-drawer-items', class CartDrawerItems extends HTMLElement {
    constructor() {
      super();
      this.lineItemStatusElement = document.getElementById('CartDrawer-LineItemStatus');

      const debouncedOnChange = this.debounce((event) => {
        this.onChange(event);
      }, 300);

      this.addEventListener('change', debouncedOnChange.bind(this));
    }

    onChange(event) {
      this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
    }

    updateQuantity(line, quantity, name) {
      this.enableLoading(line);

      const body = JSON.stringify({
        line,
        quantity,
        sections: ['cart-drawer', 'cart-icon-bubble'],
        sections_url: window.location.pathname
      });

      fetch(`${window.routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
        .then((response) => {
          return response.text();
        })
        .then((state) => {
          const parsedState = JSON.parse(state);
          const cartDrawer = document.querySelector('cart-drawer');

          if (parsedState.errors) {
             console.error(parsedState.errors);
             this.disableLoading(line);
             return;
          }

          this.classList.toggle('is-empty', parsedState.item_count === 0);
          if (cartDrawer) cartDrawer.classList.toggle('is-empty', parsedState.item_count === 0);

          this.getSectionsToRender().forEach((section => {
            const sectionElement = document.getElementById(section.id);
            if (sectionElement) {
              const html = parsedState.sections[section.section];
              if (html) {
                const elementToReplace = sectionElement.querySelector(section.selector) || sectionElement;
                elementToReplace.innerHTML = this.getSectionInnerHTML(html, section.selector);
              }
            }
          }));

          this.disableLoading(line);
        }).catch((error) => {
          console.error(error);
          this.disableLoading(line);
        });
    }

    getSectionsToRender() {
      return [
        {
          id: 'CartDrawer-CartItems',
          section: 'cart-drawer',
          selector: '.js-contents'
        },
        {
          id: 'cart-icon-bubble',
          section: 'cart-drawer', // Usually Shopify serves this from the requested section but here we just need the bubble
          selector: '.shopify-section'
        },
        {
          id: 'CartDrawer-Footer',
          section: 'cart-drawer',
          selector: '.cart-drawer__footer'
        }
      ];
    }

    getSectionInnerHTML(html, selector) {
      return new DOMParser()
        .parseFromString(html, 'text/html')
        .querySelector(selector).innerHTML;
    }

    enableLoading(line) {
      const mainCartItems = document.getElementById('CartDrawer-CartItems');
      if (mainCartItems) mainCartItems.classList.add('cart__items--disabled');

      const cartItem = document.getElementById(`CartDrawer-Item-${line}`);
      if (cartItem) cartItem.classList.add('cart-item--loading');
    }

    disableLoading(line) {
      const mainCartItems = document.getElementById('CartDrawer-CartItems');
      if (mainCartItems) mainCartItems.classList.remove('cart__items--disabled');

      const cartItem = document.getElementById(`CartDrawer-Item-${line}`);
      if (cartItem) cartItem.classList.remove('cart-item--loading');
    }

    debounce(fn, wait) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
      };
    }
  });
}

if (!customElements.get('cart-remove-button')) {
  customElements.define('cart-remove-button', class CartRemoveButton extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('click', (event) => {
        event.preventDefault();
        const cartDrawerItems = this.closest('cart-drawer-items');
        cartDrawerItems.updateQuantity(this.dataset.index, 0);
      });
    }
  });
}

if (!customElements.get('quantity-input')) {
  customElements.define('quantity-input', class QuantityInput extends HTMLElement {
    constructor() {
      super();
      this.input = this.querySelector('input');
      this.changeEvent = new Event('change', { bubbles: true });

      this.querySelectorAll('button').forEach(
        (button) => button.addEventListener('click', this.onButtonClick.bind(this))
      );
    }

    onButtonClick(event) {
      event.preventDefault();
      const previousValue = this.input.value;

      if (event.currentTarget.name === 'plus') {
        this.input.stepUp();
      } else {
        this.input.stepDown();
      }

      if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
    }
  });
}
