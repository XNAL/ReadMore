<template>
	<div class="rank">
		<header-bar :sex="sex" v-on:change-sex="changeSex"></header-bar>
		<template v-if="sex === 'male'">
			<section class="rank-bar-section">
				<ul class="rank-list">
					<li v-for="rank in maleRankList"
						:class="['rank-item', 'fl', {active: rank._id === rankId}]"
						@click="changeRankId(rank._id)"
						:key="rank._id">
						{{ rank.shortTitle }}
					</li>
				</ul>
			</section>
		</template>
		<template v-else-if="sex === 'female'">
    		<section class="rank-bar-section">
    			<ul class="rank-list">
    				<li v-for="rank in femaleRankList"
    					:class="['rank-item', 'fl', {active: rank._id === rankId}]"
    					@click="changeRankId(rank._id)"
    					:key="rank._id">
    					{{ rank.shortTitle }}
    				</li>
    			</ul>
    		</section>
		</template>
		<section class="book-list-section">
			<book-list :book-list="bookList" v-if="bookList.length > 0"></book-list>
			<div class="no-more" v-if="!isLoading">没有更多了</div>
			<list-loading v-show="isLoading"></list-loading>
		</section>

		<tabbar></tabbar>
        <page-loading v-if="isShowPageLoading"></page-loading>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import api from '../fetch/api';
import bookList from '@/components/BookList';
import listLoading from '@/components/ListLoading';
import headerBar from '@/components/Header';
import tabbar from '@/components/Tabbar';
import pageLoading from '@/components/PageLoading';
import { RANK_PAGE } from '../util/util';

export default {
	name: 'rank',
	components: {
		bookList,
		listLoading,
		headerBar,
		tabbar,
		pageLoading
	},
	data() {
		return {
			sex: 'male',
			maleRankList: [],
			femaleRankList: [],
			rankId: '',
			bookList: [],
	        isShowPageLoading: true,
			isLoading: true
		};
	},
	watch: {
		// '$route': 'fetchData',
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
		this.SET_HEADER_INFO({
			title: '排行榜',
			type: RANK_PAGE
		});
		this.fetchData();
	},
	methods: {
		...mapMutations([
			'SET_HEADER_INFO'
		]),
		fetchData: function () {
			api.getRanks()
				.then(data => {
					this.maleRankList = data.male;
					this.femaleRankList = data.female;
					this.rankId = this.maleRankList[0]._id;
					this.isShowPageLoading = false;
				})
		},
		changeSex: function(sex) {
			if (this.sex === sex) {
				return;
			} else {
				this.sex = sex;
				this.rankId = sex === 'male' ? this.maleRankList[0]._id : this.femaleRankList[0]._id;
			}
		},
		changeRankId: function(rankId) {
			this.rankId = rankId;
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

			height: 36px;
			line-height: 36px;
			text-align: center;
			border-left: 2px solid #f6f7f9;
			box-sizing: border-box;

			&.active {
				background-color: #fff;
				border-left: 2px solid #ed424b;
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
