import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);

const state = {
	curBook: '',		//当前查看的书籍对象
	headerTitle: 'RM',	//头部标题
	headerType: '',		//头部类型：featured:精选、rank:排行榜
	shelfBookList: [],	//书架书籍对象数组
	nightMode: false,	//是否夜间模式
	skinColor: ''		//阅读页面背景色
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
