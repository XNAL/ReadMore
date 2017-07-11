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
	mapState,
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
    computed: {
        ...mapState([
            'curBook',
            'shelfBookList'
        ])
    },
	created() {
		// this.bookId = this.$route.params.id;
		let isInShelf = false;
		for(let book of Object.values(this.shelfBookList)) {
			if (book.id === this.$route.params.id) {
				isInShelf = true;
				this.SET_CUR_BOOK(book);
				break;
			}
		}
		if (!isInShelf) {
			this.SET_CUR_BOOK({
				id: this.$route.params.id,	//书籍id
				title: '',					//书名
				cover: '',					//封面
				author: '',					//作者
				lastChapter: '',			//已更新的最新章节
				updated: '',				//更新时间
				readChapter: '',			//已读章节
				isInShelf: false,			//是否已在书架中，false：不在，true：在
				sort: false					//目录顺序，false：正序， true：倒序
			});
		}
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
    // height: 100%;
    overflow: hidden;
    margin: 40px 0 70px;
}
</style>
