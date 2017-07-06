<template>
	<section class="rank-bar">
		<ul class="rank-list">
			<li class="rank-item fl" v-for="rank in rankList" :key="rank._id">
				<router-link :to="{ name: 'rank', params: { id: rank._id } }">{{ rank.shortTitle }}</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	name: 'rankbar',
	props: {
		rankList: Array
	},
	data() {
		return {};
	}
}
</script>

<style lang="scss">
.rank-bar {
	position: relative;
	width: 100%;
	height: 100%;
	// overflow: hidden;
	overflow-y: scroll;

	.rank-list {
		width: 100%;
		overflow: hidden;
	}
	.rank-item {
		display: block;

		a {
			display: block;
			width: 100%;
			height: 30px;
			line-height: 30px;
			text-align: center;
		}
	}
}
</style>
