<template>
<section class="list-section" ref="list">
	<backbar :title="title"></backbar>
	<book-list :book-list="list" v-if="list.length > 0"></book-list>
	<list-loading v-show="isLoading"></list-loading>
</section>
</template>

<script>
import api from '../fetch/api';
import {debounce} from '../util/util';
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
			$body: null,
			$list: null,
			clientHeight: 0
		}
	},
	created: function() {
		this.id = this.$route.params.id;
		this.fetchData();
	},
	mounted: function() {
		this.$body = document.body;
		this.clientHeight = this.$body.clientHeight;
		this.$list = this.$refs.list;
		window.addEventListener('scroll', debounce(this.loadMore));
	},
	methods: {
		fetchData: function() {
			api.getBookList(this.id, this.page)
				.then(data => {
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
					this.isLoading = false;
				})
		},
		loadMore: function() {
			let scrollTop = this.$body.scrollTop;
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
