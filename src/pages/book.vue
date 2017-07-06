<template>
	<div class="book">
		<backbar :title="title"></backbar>
		<book-info :book-id="bookId"></book-info>
		<bookbar></bookbar>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import backbar from '@/components/Backbar';
import bookInfo from '@/components/BookInfo';
import bookbar from '@/components/Bookbar';

export default {
	name: 'book',
	components: {
		backbar,
		bookInfo,
		bookbar
	},
	data() {
		return {
			bookId: '',
			title: '书籍详情'
		}
	},
	created() {
		this.bookId = this.$route.params.id;
		this.SET_CUR_BOOKID(this.bookId);
		this.INIT_SHELF();
	},
	methods: {
		...mapMutations([
			'INIT_SHELF',
			'SET_HEADER_INFO',
			'SET_CUR_BOOKID'
		])
	}
}
</script>

<style lang="scss">
.book {
	position: relative;
	height: 100%;
	overflow: hidden;
	margin-top: 40px;
}
</style>
