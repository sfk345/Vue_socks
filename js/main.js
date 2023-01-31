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
             <p>{{productDetails}}</p>
             <ul v-for="size in sizes">
                <li>{{ size }}</li>
            </ul>
             <p>Shipping: {{ shipping }}</p>
             <p>User is premium: {{premium}}</p>
             <div
                class="color-box"
                v-for="(variant, index) in variants"
                :key="variant.variantId"
                :style="{ backgroundColor:variant.variantColor }"
                @mouseover="updateProduct(index)">
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
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },
        outOfCart() {
            this.$emit('out-of-cart',
            this.variants[this.selectedVariant].variantId);
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
        },
        productDetails() {
            if (this.details) {
                return this.details;
            } else if (!this.details){
                return "Detailed information is missing"
            }
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        updateCartTwo(id) {
            this.cart.pop(id);
        },
    }
})




