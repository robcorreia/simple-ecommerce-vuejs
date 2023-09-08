const vm = new Vue({
  el: '#app',
  data: {
    products: [],
    product: false,
    cart: [],
  },
  filters: {
    formatPrice(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
    }
  },
  computed: {
    cartTotal() {
      let cartTotal = 0;
      if(this.cart.length) {
        this.cart.forEach(item => {
          cartTotal += item.preco
        })
      }
      return cartTotal
    },
  },
  methods: {
   async getProducts() {
      const response = await fetch('./api/produtos.json');
      const data = await response.json()
      this.products = data;
    },
    async getProduct(id) {
      const response = await fetch(`./api/produtos/${id}/dados.json`);
      const data = await response.json();
      this.product = data;
    },
    openModal(id){
      this.getProduct(id);
      window.scrollTo({top: 0, behavior: 'smooth'})
    },
    closeModal({target, currentTarget}) {
      if(target === currentTarget) this.product = false;
    },
    addCart() {
      this.product.estoque --;
      const { id, nome, preco} = this.product;
      this.cart.push({
        id,
        nome,
        preco
      })
    },
    removeCart(index) {
      this.cart.splice(index, 1)
    },
    checkLocalStorage() {
      if(window.localStorage.cart) this.cart = JSON.parse(window.localStorage.getItem('cart'))
      
    }
  },
  watch: {
    cart(){
      window.localStorage.cart = JSON.stringify(this.cart)
    }
  },
  created() {
    this.getProducts()
    this.checkLocalStorage()
  }
})