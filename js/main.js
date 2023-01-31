let eventBus = new Vue()

Vue.component('product-information', {
    template: `
       <div>
        <ul>
         <span class="tab" 
             :class="{activeTab: selectedTab === tab}"
             v-for="(tab, index) in tabs"
             @click="selectedTab = tab">
             {{ tab }}</span>
        </ul>
        <div v-show="selectedTab === 'Shipping'">
            <p>{{shipping}}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
            <product-details :details="details"></product-details>
        </div>
       </div>
    `,
    props: {
        shipping: {
            type: Function,
            required: false
        },
        details: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    },
})


Vue.component('product-tabs', {
    template: `
       <div>
        <ul>
         <span class="tab" 
             :class="{activeTab: selectedTab === tab}"
             v-for="(tab, index) in tabs"
             @click="selectedTab = tab">
             {{ tab }}</span>
        </ul>
        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{review.name}}</p>
                    <p>Rating: {{review.rating}}</p>
                    <p>{{review.review}}</p>
                    <p>{{review.recommend}}</p>
                </li>
            </ul>
        </div>
        <div v-show="selectedTab === 'Make a Review'">
            <product-review></product-review>
        </div>
       </div>
    `,
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    },
})




Vue.component('product-review', {
    template: `
   <form class="review-form" @submit.prevent="onSubmit">
   <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
        <li v-for="error in errors">{{error}}</li>
    </ul>
   </p>
   
   <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
   </p>
   
   <p>
        <label for="review">Review</label>
        <textarea id="review" v-model="review"></textarea>
   </p>

   <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
   </p>
   <p>
        <label for="recommend">Would you recommend this product?</label>
        <select id="recommend" v-model.number="recommend">
            <option>Yes</option>
            <option>No</option>
        </select>
   </p>
   <p>
        <input type="submit" value="Submit">
   </p>
   </form>
 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recommend: null
        }
    },
    methods: {
        onSubmit(){
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required")
                if(!this.review) this.errors.push("Review required")
                if(!this.rating) this.errors.push("Rating required")
                if(!this.recommend) this.errors.push("Rating recommend")
            }

        }
    }
})


Vue.component('product', {
    template: `
    <div class="product">
        <div class="product-image">
               <img :src="image" :alt="altText"/>
        </div>
    
        <div class="product-info">
        
             <h1>{{ title }}</h1>
             <p>{{description}}</p>
             <a :href="link">More products like this</a>
             <p v-if="inStock">In stock</p>
             <p v-else :class="{LineThrough: !inStock}">Out of Stock</p>
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
             <product-information :shipping="shipping" :details="details"></product-information>
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
        <product-tabs :reviews="reviews"></product-tabs>
    </div>
 `,
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Number
        }
    },
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            description: "A pair of warm, fuzzy socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            selectedVariant: 0,
            altText: "A pair of socks",
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
            reviews: []
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
        },
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
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
    },
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    },
})

Vue.component('product-details', {
    template: `
    <div class="product-details">
        <span>Details:</span>
        <ul v-for="detail in details">
            <li>{{ detail }}</li>
        </ul>   
    </div>
    `,
    props: {
        details: {
            type: Array,
        }
    },
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







