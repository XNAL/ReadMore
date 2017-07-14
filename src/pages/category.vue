<template>
    <div class="category">
		<header-bar :title="headerTitle"></header-bar>
        <div class="cat-section">
            <cat v-for="category in categories" :category="category" v-if="category !== null" :key="category.title"></cat>
        </div>
        <tabbar></tabbar>
        <page-loading v-if="isShowPageLoading"></page-loading>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { CATEGORY_PAGE } from '../util/util';
import api from '../fetch/api';
import cat from '@/components/Cat';
import headerBar from '@/components/Header';
import tabbar from '@/components/Tabbar';
import pageLoading from '@/components/PageLoading';

export default {
    name: 'category',
    components: {
        cat,
        headerBar,
        tabbar,
        pageLoading
    },
    data() {
        return {
            isShowPageLoading: true,
            headerTitle: '分类',
            categories: []
        }
    },
    created: function () {
		this.SET_HEADER_INFO({
			title: '分类',
			type: CATEGORY_PAGE
		});
        this.fetchData();
    },
    methods: {
		...mapMutations([
			'SET_HEADER_INFO'
		]),
        fetchData: function() {
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
                    this.$nextTick(function () {
                        this.isShowPageLoading = false;
                    })
                })
        }
    }
}
</script>

<style lang="scss">
.cat-section {
    margin: 40px 0 70px;
}
</style>
