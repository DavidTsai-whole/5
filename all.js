import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import productModal from './modal.js';
const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'jamestsai';

const app = createApp({
    data() {
        return {
            products: [],
            cartData: {},
            tempProduct: {},
        }
    },
    components: {
        productModal
    },
    methods: {
        getProducts() {
            const api = `${apiUrl}/api/${apiPath}/products/all`;
            axios.get(api).then(res => {
                if (res.data.success) {
                    this.products = res.data.products;
                } else {
                    alert('資料讀取失敗');
                }
            }).catch(error => {
                console.log(error);
            })
        },
        addCart(id, qty = 1) {
            const data = {
                product_id: id,
                qty,
            }
            const api = `${apiUrl}/api/${apiPath}/cart`;
            axios.post(api, { data }).then(res => {
                if (res.data.success) {
                    alert(res.data.message)
                    this.getCartData();
                    this.$refs.modalA.modal.hide();
                    this.$refs.modalA.qty = 1;
                } else {
                    alert(res.data.message)
                }

            }).catch(error => {
                console.log(error)
            })
        },
        getCartData() {
            const api = `${apiUrl}/api/${apiPath}/cart`;
            axios.get(api).then(res => {
                if (res.data.success) {
                    this.cartData = res.data.data;
                    this.getCartData();
                } else {
                    alert('購物車資料讀取失敗');
                }
            }).catch(error => {
                console.log(error)
            })
        },
        delSingleCart(id) {
            const api = `${apiUrl}/api/${apiPath}/cart/${id}`;
            axios.delete(api).then(res => {
                if (res.data.success) {
                    alert(res.data.message)
                } else {
                    alert('刪除失敗')
                }
            }).catch(error => {
                console.log(error)
            })

        },
        allDelete() {
            const api = `${apiUrl}/api/${apiPath}/carts`;
            axios.delete(api).then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    this.getCartData();
                } else {
                    alert(res.data.message);
                }
            }).catch(error => {
                console.log(error)
            })
        },
        seeMore(item) {
            const api = `${apiUrl}/api/${apiPath}/product/${item.id}`
            axios.get(api).then(res=>{
                if(res.data.success){
                    this.tempProduct = res.data.product
                    this.$refs.modalA.modal.show();
                }
                else{
                    alert(res.data.message)
                }
            }).catch(error=>{
                console.log(error)
            })
            
        },
        updateCart(item) {
            const data = {
                product_id: item.id,
                qty: item.qty,
            }
            const api = `${apiUrl}/api/${apiPath}/cart/${item.id}`
            axios.put(api, { data }).then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    this.getCartData();
                } else {
                    alert(res.data.message);
                }
            }).catch(error => {
                console.log(error)
            })
        }
    },
    created() {
        this.getProducts();
        this.getCartData();
    }
});
/*  VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
}); */

/* app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage); 
 */
app.mount('#app');