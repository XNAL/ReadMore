import {
	INIT_SHELF,
	ADD_TO_SHELF,
	DEL_FROM_SHELF,
	DEL_ALL_SHELF,
	SET_HEADER_INFO,
	SET_CUR_BOOK,
	SET_NIGHT_MODE
} from './mutation-types';

import {
	setStore,
	getStore,
	removeStore
} from '../util/util';

export default {
	[INIT_SHELF](state) {
		let initBookList = getStore('SHEFLBOOK');
		if (initBookList) {
			state.shelfBookList = JSON.parse(initBookList);
		}
	},

	[SET_HEADER_INFO](state, {
		title,
		type
	}) {
		state.headerTitle = title;
		state.headerType = type;
	},

	[ADD_TO_SHELF](state, book) {
		let isExist = false;
		for(let shelfBook of Object.values(state.shelfBookList)) {
			if (shelfBook.id === book.id) {
				isExist = true;
				break;
			}
		}
		if (!isExist) {
			state.shelfBookList.push(book);
			setStore('SHEFLBOOK', state.shelfBookList);
		}
	},

	[DEL_FROM_SHELF](state, bookIds) {
		state.shelfBookList = state.shelfBookList.filter(value => {
			return !bookIds.includes(value.id);
		});
		setStore('SHEFLBOOK', state.shelfBookList);
	},

	[DEL_ALL_SHELF](state) {
		state.shelfBookList.clear();
		removeStore('SHEFLBOOK');
	},

	[SET_CUR_BOOK](state, book) {
		state.curBook = book;
	},

	[SET_NIGHT_MODE](state, isNight) {
		state.nightMode = isNight;
		setStore('NIGHTMODE', state.nightMode);
	}
}
