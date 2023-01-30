Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
               <img :src="image" :alt="altText"/>
        </div>
    
        <div class="product-info">
             <h1 v-if="inventory > 100">{{ sale }}</h1>
             <h1 v-else>{{ title }}</h1>
             <p>{{description}}</p>
             <a :href="link">More products like this</a>
             <p v-if="inStock">In stock</p>
             <p v-else :class="{LineThrough: !inStock}">Out of Stock</p>
             <ul>
                <li v-for="detail in details">{{ detail }}</li>
             </ul>
             <p>Shipping: {{ shipping }}</p>
             <div
                class="color-box"
                v-for="(variant, index) in variants"
                :key="variant.variantId"
                :style="{ backgroundColor:variant.variantColor }"
                @mouseover="updateProduct(index)">
             </div>
              
             <div class="cart">
                <p>Cart({{ cart }})</p>
             </div>
    
             <button
             v-on:click="addToCart"
             :disabled="!inStock"
             :class="{ disabledButton: !inStock }">
                Add to cart
             </button>
             <button
             v-on:click="outOfCart"
             :disabled="!inStock"
             :class="{ disabledButton: !inStock }">
                Out of cart
             </button>
           
        </div>
    </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            description: "A pair of warm, fuzzy socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            onSale: "on Sale",
            inventory: 1000,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./img/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./img/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        outOfCart() {
            if (this.cart >= 1){
                this.cart -= 1
            }
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            return this.brand + ' ' + this.product + ' ' + this.onSale
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
})




