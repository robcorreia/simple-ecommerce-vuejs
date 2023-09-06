const vm = new Vue({
  el: '#app',
  data: {
    products: [],
    product: false
  },
  filters: {
    formatPrice(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
    }
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
    }
  },
  created() {
    this.getProducts()
  }
})