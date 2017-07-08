<template>
<div class="book">
	<backbar :title="title"></backbar>
	<book-info></book-info>
	<review></review>
	<recommend></recommend>
	<bookbar></bookbar>
</div>
</template>

<script>
import {
	mapMutations
} from 'vuex';
import backbar from '@/components/Backbar';
import bookInfo from '@/components/BookInfo';
import review from '@/components/Review';
import recommend from '@/components/Recommend';
import bookbar from '@/components/Bookbar';

export default {
	name: 'book',
	components: {
		backbar,
		bookInfo,
		review,
		recommend,
		bookbar
	},
	data() {
		return {
			title: '书籍详情'
		}
	},
	created() {
		// this.bookId = this.$route.params.id;
		this.SET_CUR_BOOK({
			id: this.$route.params.id,
			title: '',
			cover: '',
			author: '',
			lastChapter: '',
			updated: '',
			readChapter: '',
			sort: true
		});
	},
	methods: {
		...mapMutations([
			'SET_HEADER_INFO',
			'SET_CUR_BOOK'
		])
	}
}
</script>

<style lang="scss">
.book {
    position: relative;
    height: 100%;
    overflow: hidden;
    margin: 40px 0 70px;
}
</style>
