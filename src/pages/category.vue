<template>
    <div class="category">
		<header-bar :title="headerTitle"></header-bar>
        <div class="cat-section">
            <cat v-for="category in categories" :category="category" v-if="category !== null" :key="category.title"></cat>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import api from '../fetch/api';
import cat from '@/components/Cat';
import headerBar from '@/components/Header';
import tabbar from '@/components/Tabbar';

export default {
    name: 'category',
    components: {
        cat,
        headerBar,
        tabbar
    },
    data() {
        return {
            headerTitle: '分类',
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
                                gender: 'male',
                                catList: value
                            };
                            break;
                        case 'female':
                            obj = {
                                title: '女生',
                                gender: 'female',
                                catList: value
                            };
                            break;
                        case 'press':
                            obj = {
                                title: '出版',
                                gender: 'press',
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
    margin: 40px 0 70px;
}
</style>
