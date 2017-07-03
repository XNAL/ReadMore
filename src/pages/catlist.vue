<template>
<section class="catlist-section" id="catListId">
	<backbar :title="title"></backbar>
	<book-list :book-list="list" v-if="list.length > 0"></book-list>
	<list-loading v-show="isLoading"></list-loading>
</section>
</template>

<script>
import api from '../fetch/api';
import loadMore from '../util/loadMore';
import bookList from '@/components/BookList';
import backbar from '@/components/Backbar';
import listLoading from '@/components/ListLoading';

export default {
	name: 'catlist',
	components: {
		backbar,
		bookList,
		listLoading
	},
	data() {
		return {
			title: '',
			list: [],
			start: 0,
			gender: '',
			type = '',
			major = '',
			minor = '',
			isLoading: false,
			isEnding: false,
			$body: null,
			$list: null,
			clientHeight: 0
		}
	},
	created() {

	},
	mounted() {
		this.$body = document.body;
		this.clientHeight = this.$body.clientHeight;
		this.$list = document.getElementById('catListId');
		window.addEventListener('scroll', loadMore.debounce(this.loadMoreBooks));
	},
	methods: {
		fetchCatList: function() {
			api.getCatList()
				.then(data => {
					
				})
		},
		fetchData: function() {
			api.getCatBooks(this.gender, this.type, this.major, this.minor, this.start)
				.then(data => {
					if (data.length < 10) {
						this.isEnding = true;
					}
					this.list.push(...data);
					this.isLoading = false;
				})
		},
		loadMoreBooks: function() {
			let scrollTop = this.$body.scrollTop;
			let offsetHeight = this.$list.offsetHeight;
			if (offsetHeight - scrollTop - this.clientHeight < 160) {
				if (this.isEnding === true) {
					return;
				}
				this.start++;
				this.isLoading = true;
				this.fetchData();
			}
		}
	}
}
</script>

<style lang="scss">
Error: Source sample is missing.
</style>
