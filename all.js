var app = new Vue({
    el: '#app',
    data: {
        arr: [],
        modaltext: '',
        product: {
        },
        products: [
            {
                id: 1546765915250,
                unit: '杯',
                category: '咖啡',
                title: '拿鐵',
                origin_price: 150,
                price: 105,
                description: '香醇牛奶配上咖啡',
                content: '實在太香了',
                is_enabled: 1,
                imageUrl: 'https://images.unsplash.com/photo-1568046562322-0bbc869368ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
            }
        ],
        isNew: false
    },
    methods: {
        getProduct() {
            if (this.product.id) {
                const id = this.product.id;
                this.products.forEach((item, i) => {
                    if (item.id === id) {
                        this.products[i] = this.product;
                    }
                });
            } else {
                const id = new Date().getTime();
                this.product.id = id;
                this.products.push(this.product);
            }
            this.product = {};
            $('#productModal').modal('hide');
        },
        openModal(isNew, item) {
            switch (isNew) {
                case true:
                    this.product = {};
                    $('#productModal').modal('show');
                    break;
                case false:
                    this.product = Object.assign({}, item);
                    $('#productModal').modal('show');
                    break;
                default:
                    break;
            }
        },
        deleteData(id) {
            if (this.product.id) {
                const id = this.product.id;
                this.products.forEach((item, i) => {
                    if (item.id === id) {
                        this.products.splice(i, 1);
                        this.product = {};
                    }
                });
            }
        },
    },
})
