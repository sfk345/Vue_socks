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
                variantColor: 'green'
            },
            {
                variantID: 2235,
                variantColor: 'blue'
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }
})
