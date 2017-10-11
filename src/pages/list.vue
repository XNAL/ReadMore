<template>
<section class="list-section" ref="list">
	<backbar :title="title"></backbar>
	<book-list :book-list="list" v-if="list.length > 0"></book-list>
	<div class="no-more" v-if="isEnding">没有更多了</div>
	<list-loading v-show="isLoading"></list-loading>
</section>
</template>

<script>
import {
	mapState
} from 'vuex';
import api from '../fetch/api';
import {
	BOOK_PAGE,
	debounce
} from '../util/util';
import bookList from '@/components/BookList';
import backbar from '@/components/Backbar';
import listLoading from '@/components/ListLoading';

export default {
	name: 'list',
	components: {
		bookList,
		backbar,
		listLoading
	},
	data() {
		return {
			id: '',
			list: [],
			title: '',
			page: 1,
			isLoading: true,
			isEnding: false,
			$docElement: null,
			$body: null,
			$list: null,
			clientHeight: 0
		}
	},
	computed: {
		...mapState([
			'headerTitle',
			'headerType'
		])
	},
	created: function() {
		if (this.headerType === BOOK_PAGE) {
			this.title = this.headerTitle;
		}
		this.id = this.$route.params.id;
		this.fetchData();
	},
	mounted: function() {
		this.$docElement = document.documentElement;
		this.$body = document.body;
		this.clientHeight = this.$body.clientHeight;
		this.$list = this.$refs.list;
		window.addEventListener('scroll', debounce(this.loadMore));
	},
	methods: {
		fetchData: function() {
			if (this.headerType === BOOK_PAGE) {
				console.log('book', 1);
				api.getRecommend(this.id)
					.then(data => {
						this.list = data;
						this.$nextTick(function() {
							this.isEnding = true;
							this.isLoading = false;
						})
					})
			} else {
				api.getBookList(this.id, this.page)
					.then(data => {
						if (data.length === 0) {
							return [];
						}
						this.title = data[0].node.title;
						data = data.map(value => {
							return value.book;
						});
						return data;
					})
					.then(data => {
						if (data.length < 10) {
							this.isEnding = true;
						}
						this.list.push(...data);
						this.$nextTick(function() {
							this.isLoading = false;
						})
					})
			}
		},
		loadMore: function() {
            let scrollTop = this.$body.scrollTop + this.$docElement.scrollTop;
			let offsetHeight = this.$list.offsetHeight;
			if (offsetHeight - scrollTop - this.clientHeight < 160) {
				if (this.isEnding === true) {
					return;
				}
				this.page++;
				this.isLoading = true;
				this.fetchData();
			}
		}
	}
}
</script>

<style lang="scss">
.list-section {
    padding-top: 40px;
}
</style>
