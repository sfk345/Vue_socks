let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description: "A pair of warm, fuzzy socks.",
        image: "./img/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        link: "More products like this",
        inStock: true,
        inventory: 1000,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantID: 2234,
                variantColor: 'green',
                variantIMG: "./img/vmSocks-green-onWhite.jpg"
            },
            {
                variantID: 2235,
                variantColor: 'blue',
                variantIMG: "./img/vmSocks-blue-onWhite.jpg"
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    },
    methods: {
        addToCart(){
            this.cart += 1
        },
        outCart() {
            this.cart -= 1
        },
        updateProduct(variantIMG){
            this.image = variantIMG
        }
    }
})
