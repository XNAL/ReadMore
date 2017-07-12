import async from './fetch';

const apiUrl = '/api';
const chapterUrl = '/chapterapi';

export default {
	getFeaturedData() {
		return async(apiUrl + '/recommendPage/nodes/5910018c8094b1e228e5868f')
			.then(data => data.data);
	},

	getBooks(id) {
		return async(apiUrl + '/recommendPage/books/' + id)
			.then(data => data.data);
	},

	getSwiperPictures() {
		return async(apiUrl + '/recommendPage/node/spread/575f74f27a4a60dc78a435a3', {
				pl: 'ios'
			})
			.then(data => data.data);
	},

	getCategory() {
		return async(apiUrl + '/cats/lv2/statistics');
	},

	getMinorList() {
		return async(apiUrl + '/cats/lv2');
	},

	getCatBooks(gender, type = 'hot', major = '', minor = '', start = 0, limit = 20) {
		return async(apiUrl + '/book/by-categories', {
				gender: gender,
				type: type,
				major: major,
				minor: minor,
				start: start,
				limit: limit
			})
			.then(data => data.books);
	},

	getRanks() {
		return async(apiUrl + '/ranking/gender');
	},

	getRankBooks(id) {
		return async(apiUrl + '/ranking/' + id);
	},

	getBookList(id, st = 1, size = 10) {
		return async(apiUrl + '/recommendPage/node/books/all/' + id, {
			ajax: 'ajax',
			st: st,
			size: size
		}, 'post');
	},

	getBook(id) {
		return async(apiUrl + '/book/' + id);
	},

	getReview(id, limit = 5) {
		return async(apiUrl + '/post/review/best-by-book', {
			book: id,
			limit: limit
		}).then(data => data.reviews);
	},

	getRecommend(id) {
		return async(apiUrl + '/book/' + id + '/recommend')
			.then(data => data.books);
	},

	getChapters(id) {
		return async(apiUrl + '/btoc', {
			view: 'summary',
			book: id
		}).then(data => {
			return async(apiUrl + '/btoc/' + data[0]._id, {
				view: 'chapters',
				channel: 'mweb'
			}).then(data => {
				return data.chapters
			});
		})
	},

	getChapterContent(id) {
		return async(chapterUrl + '/chapter/' + id, {
			cv: '1495097622174'
		}).then(data => data.chapter);
	},

	getShelfBookUpdate(ids) {
		return async(apiUrl + '/book', {
			view: 'updated',
			id: ids.toString()
		})
	},

	getSearchHotKeywords() {
		return async(apiUrl + '/book/search-hotwords')
			.then(data => data.searchHotWords);
	},

	searchByKeyword(keyword) {
		return async(apiUrl + '/book/fuzzy-search', {
			query: keyword
		}).then(data => data.books);
	}
}

//
