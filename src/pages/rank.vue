<template>
	<div class="rank">
		<section class="rank-bar-section">
			<ul class="rank-list">
				<li class="rank-item fl" v-for="rank in rankList">
					<router-link :to="{ name: 'rank', params: { id: rank._id } }">{{ rank.shortTitle }}</router-link>
				</li>
			</ul>
		</section>
		<!-- <book-list :book-info="{ id: rank._id, type: 'rank' }" class="rank-book-list" v-if="rank !== null"></book-list> -->
	</div>
</template>

<script>
import api from '../fetch/api';
import bookList from '@/components/BookList';
import tabbar from '@/components/Tabbar';

export default {
	name: 'rank',
	components: {
		bookList,
		tabbar
	},
	data() {
		return {
			rankList: [],
			rankInfo: null
		};
	},
	created() {
		api.getRanks()
			.then(data => {
				console.log('data', data);
				this.rankList = data.male;
				// this.rankInfo = data.male[0];
			})
	}
}
</script>

<style lang="scss">
.rank {
	position: relative;
	overflow: hidden;
	height: 100%;

	.rank-bar-section {
		width: 80px;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		background-color: #f0f0f0;
		overflow: hidden;
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
				height: 30px;
				line-height: 30px;
				text-align: center;
			}
		}
	}
	.rank-book-list {
		position: relative;
		margin-left: 80px;
	}

}
</style>
