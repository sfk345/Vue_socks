let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        brand: 'Vue Mastery',
        description: "A pair of warm, fuzzy socks.",
        altText: "A pair of socks",
        onS: "on Sale",
        selectedVariant: 0,
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inventory: 101,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantID: 2234,
                variantColor: 'green',
                variantIMG: "./img/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantID: 2235,
                variantColor: 'blue',
                variantIMG: "./img/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
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
        updateProduct(index){
            this.selectedVariant = index;
            console.log(index)
        }
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantIMG;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            return this.brand + ' ' + this.product + ' ' + this.onS;
        }
    }
})
