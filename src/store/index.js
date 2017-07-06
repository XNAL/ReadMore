import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);

const state = {
	curBookId: '',		//当前查看的书籍Id
	headerTitle: 'RM',	//头部标题
	headerType: '',		//头部类型：featured:精选、rank:排行榜
	shelfBookList: []	//书架书籍
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
