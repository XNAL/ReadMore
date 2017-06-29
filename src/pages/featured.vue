<template>
<div class="featured">
	<headerBar :sex="sex"></headerBar>
	<div class="featured-book-list">
		<swiper></swiper>
		<book-list v-for="module in modules" :book-info="module" v-if="module.type === 0" :key="module._id"></book-list>
	</div>
	<tabbar></tabbar>
</div>
</template>

<script>
import api from '../fetch/api';
import bookList from '@/components/BookList';
import swiper from '@/components/Swiper';
import tabbar from '@/components/Tabbar';
import headerBar from '@/components/Header';

export default {
	name: 'featured',
	components: {
		headerBar,
		swiper,
		bookList,
		tabbar
	},
	data() {
		return {
			sex: '',
			modules: []
		};
	},
	watch: {
		'$route': 'fetchData'
	},
	created: function() {
		this.fetchData();
	},
	methods: {
		fetchData: function() {
			let sexType = this.$route.params.sex;
			// 不为female时，默认值为male
			sexType = 'female' === sexType.toLowerCase() ? 'female' : 'male';
			this.sex = sexType;
			api.getFeaturedData()
				.then(data => {
					/*
					 * 通过开发工具获取到的接口，无排序和男/女分类，其他地方也没找到相关的接口，
					 * 所以此处只好获取数据之后再进一步处理。此处的数据处理非重点内容。
					 */
					data = Array.from(data).sort((a, b) => {
						return a.order - b.order;
					});
					let sexOrder = sexType === 'male' ? [2, 5, 7, 9] : [1, 4, 6, 8];
					data = data.filter((obj) => {
						return sexOrder.includes(obj.order);
					});
					this.modules = data;
				});
		}
	}

}
</script>

<style scoped lang="scss">
.featured-book-list {
    margin-bottom: 70px;
}
</style>
