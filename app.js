const vm = new Vue({
  el: '#app',
  data: {
    products: []
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
    async getProduto() {
      const response = await fetch('');
      const data = response.json();
      
    }
  },
  created() {
    this.getProducts()
  }
})