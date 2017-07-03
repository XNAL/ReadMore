import async from './fetch';

export default {
  getFeaturedData() {
    return async('/recommendPage/nodes/5910018c8094b1e228e5868f')
      .then(data => data.data);
  },

  getBooks(id) {
    return async('/recommendPage/books/' + id)
      .then(data => data.data);
  },

  getSwiperPictures() {
    return async('/recommendPage/node/spread/575f74f27a4a60dc78a435a3', {
        pl: 'ios'
      })
      .then(data => data.data);
  },

  getCategory() {
    return async('/cats/lv2/statistics');
  },

  getCatList() {
    return async('/cats/lv2');
  },

  getCatBooks(gender, type = 'hot', major = '', minor = '', start = 0, limit = 20) {
    return async('/book/by-categories', {
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
    return async('/ranking/gender');
  },

  getRankBooks(id) {
    return async('/ranking/' + id);
  },

  getBookList(id, st = 1, size = 10) {
    return async('/recommendPage/node/books/all/' + id, {
      ajax: 'ajax',
      st: st,
      size: size
    }, 'post');
  }
}
