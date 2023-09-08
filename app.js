const vm = new Vue({
  el: '#app',
  data: {
    products: [],
    product: false,
    cart: [],
    cartActive: false,
    alertMessage: 'Item adicionado',
    alertActive: false,
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
    closeCartModal({target, currentTarget}) {
      if(target === currentTarget) this.cartActive = false;
    },
    addCart() {
      this.product.estoque --;
      const { id, nome, preco} = this.product;
      this.cart.push({
        id,
        nome,
        preco
      })
      this.alert(`${nome} foi adicionado ao carrinho.`)
    },
    removeCart(index) {
      this.cart.splice(index, 1)
    },
    checkLocalStorage() {
      if(window.localStorage.cart) this.cart = JSON.parse(window.localStorage.getItem('cart'))
      
    },
    compareStock() {
      const items = this.cart.filter(item => item.id === this.product.id)
      this.product.estoque -= items.length
      // this.product.estoque = this.product.estoque - items.length

    },
    alert(message) {
      this.alertMessage = message;
      this.alertActive = true;
      setTimeout(() => {
        this.alertActive = false
      }, 1500)
    },
    router() {
      const hash = document.location.hash;
      console.log(hash)
      if(hash) {
        this.getProduct(hash.replace('#', ''))
      }
    }
  },
  watch: {
    product() {
      document.title = this.product.nome || 'Techno';
      const hash = this.product.id || "";
      history.pushState(null, null, `#${hash}`)
      if(this.product) this.compareStock()
    },
    cart(){
      window.localStorage.cart = JSON.stringify(this.cart)
    }
  },
  created() {
    this.getProducts();
    this.checkLocalStorage();
    this.router();
  }
})