<template>
    <section class="shelf">
        <header-bar></header-bar>
        <shelf-list v-if="shelfBookList.length > 0"></shelf-list>
        <empty v-else></empty>
        <tabbar></tabbar>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import empty from '@/components/Empty';
import tabbar from '@/components/Tabbar';
import headerBar from '@/components/Header';
import shelfList from '@/components/ShelfList';
import { SHELF_PAGE } from '../util/util';

export default {
    name: 'shelf',
    components: {
        empty,
        tabbar,
        headerBar,
		shelfList
    },
	computed: {
		...mapState([
			'shelfBookList'
		])
	},
    data() {
        return {
            bookList: []
        }
    },
    created() {
		this.SET_HEADER_INFO({
			title: '我的书架',
			type: SHELF_PAGE
		});
    },
    methods: {
		...mapMutations([
			'SET_HEADER_INFO'
		])
    }
}
</script>

<style lang="scss">
.shelf {
    margin: 50px 0 70px;
}
</style>
