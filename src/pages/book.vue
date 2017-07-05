<template>
	<div class="book">
		<backbar :title="title"></backbar>
		<book-info :book-id="bookId"></book-info>
		<bookbar></bookbar>
	</div>
</template>

<script>
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
