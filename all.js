var app = new Vue({
    el: '#app',
    data: {
        arr: [],
        images: '',
        modaltext: '',
        product: {

        },
        products: [],
        Token: 'So3CduBJEl0e7d3Gu9dFgXQsjPzECLAl75llyqBoWQNGFDqYpA0vwuptDj7U',
        apipath: 'https://course-ec-api.hexschool.io/',
        UID: '0657f443-a9f0-436a-8a03-fe4e7a52465d',
        isNew: false
    },
    methods: {
        getProducts() {
            let vm = this;
            let api = `${vm.apipath}api/${vm.UID}/admin/ec/products`
            axios.get(api).then((response) => {
                vm.products = response.data.data;
            })
        },
        creatProduct() {
            let vm = this;
            let api = `${vm.apipath}api/${vm.UID}/admin/ec/product`;
            let httpMethod = "post";
            if (!vm.isNew) {
                api = `${vm.apipath}api/${vm.UID}/admin/ec/product/${vm.product.id}`;
                httpMethod = "patch";
            }
            let arr = [];
            arr.push(vm.images);
            vm.product.imageUrl = arr;
            axios[httpMethod](api, vm.product).then(function (res) {
                if (res.data.success) {
                    $("#productModal").modal("hide");
                    vm.getProducts();
                } else {
                    $("#productModal").modal("hide");
                    vm.getProducts();
                }
            })
        },
        deleteData(id) {
            let vm = this;
            let api = `${vm.apipath}api/${vm.UID}/admin/ec/product/${id}`;
            axios.delete(api)
                .then(function (res) {
                })
            vm.getProducts();
        },
        openModal(isNew, item) {
            if (isNew) {
                this.modaltext = '新增產品';
                this.product = {};
                this.isNew = true;
            } else {
                this.modaltext = '編輯產品';
                this.product = Object.assign({}, item);
                this.isNew = false;
            }
            $("#productModal").modal("show");
        },

    },
    created() {
        axios.defaults.headers['Authorization'] = `Bearer ${this.Token}`;
        this.getProducts();
    },
})
