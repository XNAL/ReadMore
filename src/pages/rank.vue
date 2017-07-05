<template>
	<div class="rank">
		<header-bar :title="headerTitle"></header-bar>
		<section class="rank-bar-section">
			<ul class="rank-list">
				<li v-for="rank in rankList" class="rank-item fl" :key="rank._id">
					<router-link :to="{ name: 'ranklist', params: { id: rank._id } }" exact :class="{active: rank._id === rankId}">{{ rank.shortTitle }}</router-link>
				</li>
			</ul>
		</section>
		<section class="book-list-section">
			<book-list :book-list="bookList" v-if="bookList.length > 0"></book-list>
			<list-loading v-show="isLoading"></list-loading>
		</section>

		<tabbar></tabbar>
	</div>
</template>

<script>
import api from '../fetch/api';
import bookList from '@/components/BookList';
import listLoading from '@/components/ListLoading';
import headerBar from '@/components/Header';
import tabbar from '@/components/Tabbar';

export default {
	name: 'rank',
	components: {
		bookList,
		listLoading,
		headerBar,
		tabbar
	},
	data() {
		return {
			headerTitle: '排行榜',
			rankList: [],
			rankId: '',
			isDefaultFirst: false,
			bookList: [],
			isLoading: true
		};
	},
	watch: {
		'$route': 'fetchData',
		rankId: function () {
			this.isLoading = true;
			this.bookList = [];
			api.getRankBooks(this.rankId)
				.then(data => {
					this.bookList = data.ranking.books;
					this.isLoading = false;
				})
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData: function () {
			this.rankId = this.$route.params.id !== undefined ? this.$route.params.id : '';
			api.getRanks()
				.then(data => {
					this.rankList = data.male;
					if (this.rankId === '') {
						this.rankId = data.male[0]._id;
						this.isDefaultFirst = true;
					}
				})
		}
	}
}
</script>

<style lang="scss">
.rank {
	position: relative;
	height: 100%;
	background: #fff;
	overflow-y: scroll;

	.rank-bar-section {
		width: 80px;
		position: fixed;
		top: 40px;
		left: 0;
		bottom: 60px;
		background-color: #f6f7f9;
		overflow-y: scroll;
		.rank-list {
			width: 100%;
			overflow: hidden;
		}
		.rank-item {
			display: block;
			width: 100%;

			a {
				display: block;
				width: 100%;
				height: 36px;
				line-height: 36px;
				text-align: center;
				border-left: 2px solid #f6f7f9;
				box-sizing: border-box;

				&.router-link-active,
				&.active {
					background-color: #fff;
					border-left: 2px solid #ed424b;
				}
			}
		}
	}

	.book-list-section {
		position: relative;
		margin: 40px 0 60px 80px;
		background-color: #fff;
	}
}
</style>
