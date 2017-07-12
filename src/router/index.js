import Vue from 'vue';
import Router from 'vue-router';
import Featured from '@/pages/featured';
import Category from '@/pages/category';
import CatList from '@/pages/catlist';
import Rank from '@/pages/rank';
import List from '@/pages/list';
import Shelf from '@/pages/shelf';
import Book from '@/pages/book';
import Read from '@/pages/read';
import Search from '@/pages/search';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'shelf',
			component: Shelf
		},
		{
			path: '/featured',
			name: 'featured',
			component: Featured
		},
		{
			path: '/category',
			name: 'category',
			component: Category
		},
		{
			path: '/catlist/:major',
			name: 'catlist',
			component: CatList
		},
		{
			path: '/rank',
			name: 'rank',
			component: Rank
		},
		{
			path: '/list/:id',
			name: 'list',
			component: List
		},
		{
			path: '/book/:id',
			name: 'book',
			component: Book
		},
		{
			path: '/read/:id',
			name: 'read',
			component: Read
		},
		{
			path: '/search',
			name: 'search',
			component: Search
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		}
	}
})
