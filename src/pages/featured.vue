<template>
	<div class="featured">
		<headerBar :title="headerTitle" :sex="sex" :link-name="link"></headerBar>
		<div class="featured-book-list">
			<swiper></swiper>
			<section class="book-list-section" v-for="module in modules" v-if="module.type === 0" :key="module._id">
				<div class="book-list-top">
					<h2 class="book-list-title">{{ module.title }}</h2>
					<div class="book-list-more fr">
						<router-link :to="{ name: 'list', params: {id : module._id} }" class="gray">更多</router-link>
					</div>
				</div>
				<home-list :book-info="{ id: module._id }"></home-list>
			</section>
		</div>
		<tabbar></tabbar>
	</div>
</template>

<script>
import api from '../fetch/api';
import homeList from '@/components/HomeList';
import swiper from '@/components/Swiper';
import tabbar from '@/components/Tabbar';
import headerBar from '@/components/Header';

export default {
	name: 'featured',
	components: {
		headerBar,
		swiper,
		homeList,
		tabbar
	},
	data() {
		return {
			headerTitle: 'RM',
			link: 'featured',
			sex: '',
			modules: []
		};
	},
	watch: {
		'$route': 'fetchData'
	},
	created: function () {
		this.fetchData();
	},
	methods: {
		fetchData: function () {
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
	margin: 40px 0 60px;
}

.book-list-section {
	position: relative; //margin-bottom: 10px;
	border-bottom: 10px solid #f6f7f9;
	padding: 15px 0 0 15px;
	background: #fff;
}

.book-list-top {
	position: relative;
	margin-bottom: 5px;
	overflow: hidden;

	.book-list-title {
		font-weight: 400;
		display: inline-block;
		color: #33373d;
		line-height: 1;
		border-left: 2px solid #ed424b;
		padding-left: 8px;
	}
	.book-list-more {
		display: inline-block;

		a {
			position: absolute;
			top: 1px;
			right: 15px;
			font-size: 14px;

			&::after {
				content: '>';
				display: inline-block;
				margin-left: 5px;
			}
		}
	}
}
</style>
