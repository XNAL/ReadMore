<template>
    <div class="category">
        <div class="cat-section">
            <cat v-for="category in categories" :category="category" v-if="category !== null"></cat>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import api from '../fetch/api';
import cat from '@/components/Cat';
import tabbar from '@/components/Tabbar';

export default {
    name: 'category',
    components: {
        cat,
        tabbar
    },
    data() {
        return {
            categories: []
        }
    },
    created: function () {
        api.getCategory()
            .then(data => {
                for (let [key, value] of Object.entries(data)) {
                    let obj = null;
                    switch (key) {
                        case 'male':
                            obj = {
                                title: '男生',
                                catList: value
                            };
                            break;
                        case 'female':
                            obj = {
                                title: '女生',
                                catList: value
                            };
                            break;
                        case 'press':
                            obj = {
                                title: '出版',
                                catList: value
                            };
                            break;
                        default:
                            break;
                    }
                    if (obj !== null) {
                        this.categories.push(obj);
                    }
                }
            })
    }
}
</script>

<style lang="scss">
.cat-section {
    margin-bottom: 70px;
}
</style>


