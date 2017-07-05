<template>
	<div class="book">
		<book-info :book-id="bookId"></book-info>
	</div>
</template>

<script>
import bookInfo from '@/components/BookInfo';

export default {
	name: 'book',
	components: {
		bookInfo
	},
	data() {
		return {
			bookId: ''
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
}
</style>
